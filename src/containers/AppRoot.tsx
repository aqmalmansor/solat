import Routes from "../navigation/Routes";

const AppRoot = () => {
  return (
    <>
      <Routes />
      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <div className="bg-background fixed bottom-0 w-full text-center hidden md:block">
      Made by&nbsp;
      <a href="https://github.com/kifasu/solat">aqmal mansor</a>
    </div>
  );
};

export default AppRoot;
