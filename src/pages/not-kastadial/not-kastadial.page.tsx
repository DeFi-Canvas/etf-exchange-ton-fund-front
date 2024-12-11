import { TonConnectButton, TonConnectUIProvider, useTonConnectUI } from "@tonconnect/ui-react";
import { Address, beginCell, Cell, contractAddress, Dictionary, fromNano, storeStateInit, toNano } from '@ton/core';
import css from './not-kastadial.module.css';
import { TonApiClient } from '@ton-api/client';
import { useState } from "react";

export const NotKastadial = () => {
    const FUND_ADDRESS = "kQDi8LdDVgmYmJpjCNORHUY9N6g1wRhqkkbx-zc1Yh094due"
    const ta = new TonApiClient({
        baseUrl: 'https://testnet.tonapi.io',
        apiKey: 'AEKR52OX7GMTTOAAAAAOYZ34DYB6MDKNEX7FGBGXHT6O6XIICMCK32VHS7A5T4VOFHCZ5YA'
    });
    const getBalance = async (user: Address, fund: Address) => ta.accounts.getAccountJettonBalance(user, fund)
    const [tonConnectUI] = useTonConnectUI();
    const [balance, setBalance] = useState(0n)
    const [lmWallet, setLMWallet] = useState("")
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    tonConnectUI.onStatusChange(async (wallet) => {
        if (wallet?.account) {
            const res = await getBalance(Address.parse(wallet?.account.address), Address.parse(FUND_ADDRESS))
            setBalance(res.balance)
            setLMWallet(res.walletAddress.address.toString())
            setIsWalletConnected(true)
        } else {
            setIsWalletConnected(false)
            setBalance(0n)
        }
    })
    const createSwapTonToJettonMessage = (pTONAddress: string, userWallet: string, stonFiJettonWallet: string, indexAddress: string) => {
        const owner = Address.parse(indexAddress)
        const user = Address.parse(userWallet)
        const refundAddress = user
        const excessesAddress = user
        const txDeadline = Math.floor(Date.now() / 1000) + 15 * 60

        const minOut = 1
        const receiver = owner
        const fwdGas = toNano("0.35")
        const customPayload = beginCell()
            .storeUint(0x4ff49f26, 32)
            .storeAddress(user)
            .endCell()
        const refundFwdGas = toNano("0.35")
        const refundPayload = beginCell()
            .storeUint(0xb27195e8, 32)
            .storeAddress(user)
            .endCell()
        const refFee = 100
        const refAddress = owner
        const crossSwapBody = beginCell()
            .storeCoins(minOut)
            .storeAddress(receiver)
            .storeCoins(fwdGas)
            .storeMaybeRef(customPayload)
            .storeCoins(refundFwdGas)
            .storeMaybeRef(refundPayload)
            .storeUint(refFee, 16)
            .storeAddress(refAddress)
            .endCell()

        const payload = beginCell()
            .storeUint(1717886506, 32)
            .storeAddress(Address.parse(stonFiJettonWallet))
            .storeAddress(refundAddress)
            .storeAddress(excessesAddress)
            .storeUint(txDeadline, 64)
            .storeRef(crossSwapBody)
            .endCell();

        const body = beginCell()
            .storeUint(32736093, 32)
            .storeUint(0, 64)
            .storeCoins(toNano("1"))
            .storeAddress(owner)
            .storeBit(true)
            .storeRef(payload)
            .endCell()

        return {
            address: pTONAddress,
            amount: toNano("2").toString(),
            payload: body?.toBoc().toString("base64"),
        }
    }
    const createDedustSwapTonToJettonMsg = (tonVaultAddr: Address, tonJettonPoolAddr: Address, fundAddress: Address, user: Address) => {
        const opCode = 3926267997;
        const queryId = 1;
        const amount = toNano(1);
        const swapKind = 0;
        const limit = 0;
        const recepientAddr = fundAddress
        const referralAddr = fundAddress
        const deadline = Math.floor(Date.now() / 1000) + 10 * 60
        const fulfillPayload = beginCell()
            .storeUint(0x4ff49f26, 32)
            .storeAddress(user)
            .endCell()
        const rejectPayload = beginCell()
            .storeUint(0xb27195e8, 32)
            .storeAddress(user)
            .endCell()
        const swapParams = beginCell()
            .storeUint(deadline, 32)
            .storeAddress(recepientAddr)
            .storeAddress(referralAddr)
            .storeMaybeRef(fulfillPayload)
            .storeMaybeRef(rejectPayload)
            .endCell()

        const body = beginCell()
            .storeUint(opCode, 32)
            .storeUint(queryId, 64)
            .storeCoins(amount)
            .storeAddress(tonJettonPoolAddr)
            .storeUint(swapKind, 1)
            .storeCoins(limit)
            .storeMaybeRef(null)
            .storeRef(swapParams)
            .endCell()
        return {
            address: tonVaultAddr.toString(),
            amount: toNano("2").toString(),
            payload: body?.toBoc().toString("base64"),
        }
    }
    const sendSwapTonToJettonMessages = async () => {
        if (tonConnectUI.wallet) {
            const fundAddress = Address.parse(FUND_ADDRESS)
            const userAddress = Address.parse(tonConnectUI.wallet?.account.address)
            const pTONAddress = "kQBbJjnahBMGbMUJwhAXLn8BiigcGXMJhSC0l7DBhdYABhG7"
            const stonFiJettonWallet1 = "kQDacX4SpigFKxvoedSuk-Wr35Nzj2umMzvZ1f4VDWZ2BCy2" // NOCO
            const stonFiJettonWallet2 = "kQBYFJ0HZRa-vlQwTkLRE7EzVFVHjhNT75PfDQCnCrGill0a" // HAMSTER
            const vaultAddress1 = Address.parse("kQC3w2f8sbDBvCb_6pWre_5VuWZUZhggSqkDGEmtMpcUASr-")
            const poolAddress1 = Address.parse("kQC9tnyfOqpuRrqqIqIWeNQW-O7Y-YlwFZs59FQYEP9o9B9l") // ETH
            const msg1 = createSwapTonToJettonMessage(pTONAddress, tonConnectUI.wallet?.account.address, stonFiJettonWallet1, FUND_ADDRESS)
            const msg2 = createDedustSwapTonToJettonMsg(vaultAddress1, poolAddress1, fundAddress, userAddress)
            const msg3 = createSwapTonToJettonMessage(pTONAddress, tonConnectUI.wallet?.account.address, stonFiJettonWallet2, FUND_ADDRESS)
            await tonConnectUI.sendTransaction({
                validUntil: Date.now() + 1000000,
                messages: [
                    msg1,
                    msg2,
                    msg3,
                ],
            })
        }
    }
    const burn = async () => {
        const jettonAmount = 1000
        const body = beginCell().storeUint(0x595f07bc, 32).storeUint(0, 64) // op, queryId
            .storeCoins(toNano(jettonAmount))
            .storeMaybeRef(null)
            .endCell()
        const msg = {
            address: lmWallet,
            amount: toNano("2").toString(),
            payload: body?.toBoc().toString("base64"),
        }
        await tonConnectUI.sendTransaction({
            validUntil: Date.now() + 1000000,
            messages: [
                msg
            ],
        })
    }
    return (
        <div className={css.card}>
            <TonConnectButton />
            <button onClick={sendSwapTonToJettonMessages} disabled={!isWalletConnected}>
                invest ton to fund
            </button>
            <button onClick={burn} disabled={!isWalletConnected || balance == 0n}>
                burn all {fromNano(balance.toString())}
            </button>
        </div>
    );
};
