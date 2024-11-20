import React, { useRef, useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import css from './bottom-sheet.module.css';
import AppButton from '@/components/AppButton/AppButton';

interface BottomSheetProps {
    children: React.ReactNode;
    open: boolean;
    hasButtonClose?: boolean;
    onClose: () => void;
}

const BottomSheet = (props: BottomSheetProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const sheetRef = useRef();

  useEffect(() => {
    if (props.open) {
      setTimeout(() => setIsMounted(true), 50);
    } else {
      setIsMounted(false);
    }
  }, [props.open]);

  const slideAnimation = useSpring({
    to: { y: props.open ? '0' : '100%' },
    config: config.stiff,
  });

  return (
    <>
      {isMounted && (
        <animated.div
          ref={sheetRef}
          className={css.bottomSheet}
          style={{...slideAnimation}}
        >
          <div className={css.bottomSheetContent}>
            <div className="app-container">
              {props.children}
              {props.hasButtonClose && <AppButton label="Close" className={css.bottomSheetButton} onClick={props.onClose} />}
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default BottomSheet;