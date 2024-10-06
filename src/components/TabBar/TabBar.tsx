import './TabBar.scss'

type PropsType ={
  children: React.ReactNode | React.ReactNode[]
}


const TabBar = ({ children }: PropsType ) => {
  return (
    <nav className={'tabBar'}>
      <div className={'tabBar__wrapper'}>
        {children}
      </div>
    </nav>
  );
};

export default TabBar;