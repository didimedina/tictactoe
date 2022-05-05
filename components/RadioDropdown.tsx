import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled, keyframes } from '@stitches/react'
import { violet, mauve, blackA, slate } from '@radix-ui/colors';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});
  
const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});
  
const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenu.Content, {
    fontFamily: "'Poppins', sans serif",
    fontWeight: "400",
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
        '&[data-side="top"]': { animationName: slideDownAndFade },
        '&[data-side="right"]': { animationName: slideLeftAndFade },
        '&[data-side="bottom"]': { animationName: slideUpAndFade },
        '&[data-side="left"]': { animationName: slideRightAndFade },
        },
    },
})

const StyledItem = styled(DropdownMenu.RadioItem, {
    all: 'unset',
    fontSize: 16,
    lineHeight: 1,
    color: slate.slate11,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    height: 32,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 24,
    userSelect: 'none',

    '&[data-disabled]': {
        color: slate.slate8,
        pointerEvents: 'none',
    },

    '&:focus': {
        backgroundColor: slate.slate3,
        color: slate.slate12,
    },
})

const StyledItemIndicator = styled(DropdownMenu.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
})





// EXPORTS --------------------------------------------------
export const Root = DropdownMenu.Root
export const Trigger = DropdownMenu.Trigger
export const Content = StyledContent
export const Group = DropdownMenu.RadioGroup
export const Item = StyledItem
export const ItemIndicator = StyledItemIndicator


