import './Icons.scss';
import Home from '../../assets/icons/home-2.svg?react'
import About from '../../assets/icons/status-up.svg?react'
import Down from '../../assets/icons/narrow-down-right.svg?react'
import Up from '../../assets/icons/narrow-up-right.svg?react'
import Chevron from '../../assets/icons/chevron-down.svg?react'
import Right from '../../assets/icons/arrow-narrow-right.svg?react'
import Load from '../../assets/icons/loading.svg?react'


export const HomeIcon = ({className = ''}: {className?: string}) => (
  <Home width={20} height={20} className={className}/>
)

export const AboutIcon = ({className = ''}: { className?: string }) => (
  <About width={20} height={20} className={className}/>
)

export const DownIcon = ({className = ''}: {className?: string}) => (
  <Down className={className}/>)


export const UpIcon = ({className = ''}: { className?: string }) => (
  <Up className={className}/>
)


export const ChevronDown = ({className = ''}: { className?: string }) => (
 <Chevron className={className}/>
)
export const RightIcon = ({className = ''}: { className?: string }) => (
 <Right className={className}/>
)

export const SpinIcon = ({className = ''}: { className?: string }) => (
  <Load className={className}/>
)