import * as t from 'io-ts';

// wallet/funds

// const fundItem = t.type({
//     // total: t.number,
//     funds: t.union([
//         t.array(
//             t.type({
//                 fund: t.type({
//                     id: t.string,
//                     name: t.string,
//                     description: t.string,
//                     management_fee: t.number,
//                     image_url: t.string,
//                     is_dao: t.boolean,
//                     risk_score: t.string,
//                     updated_event: t.string,
//                     is_avaiable: t.boolean,
//                     assets: t.unknown,
//                     value: t.number,
//                 }),
//                 value: t.number,
//             })
//         ),
//         t.undefined,
//     ]),
// });
const fundItem = t.union([
    t.array(
        t.type({
            assets: t.unknown,
            author: t.string,
            created_at: t.string,
            description: t.string,
            id: t.string,
            image_url: t.string,
            is_available: t.boolean,
            is_dao: t.boolean,
            management_fee: t.number,
            name: t.string,
            priority_number: t.number,
            risk_score: t.string,
            value: t.number,
        })
    ),
    t.undefined,
]);

export const walletFundsCodec = fundItem;

// [
//     {
//       "assets": [],
//       "author": "string",
//       "created_at": "string",
//       "description": "string",
//       "id": "string",
//       "image_url": "string",
//       "is_available": true,
//       "is_dao": true,
//       "management_fee": 0,
//       "name": "string",
//       "priority_number": 0,
//       "risk_score": "string",
//       "value": 0
//     }
//   ]
