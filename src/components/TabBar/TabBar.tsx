import './TabBar.scss'

type PropsType ={
  children: React.ReactNode | React.ReactNode[]
}


const TabBar = ({ children }: PropsType ) => {
  return (
    <nav className={'tabBar'}>
      {children}
    </nav>
  );
};

export default TabBar;