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
    <div className="fixed bottom-0 w-full text-center">
      Made by&nbsp;
      <a href="https://github.com/kifasu/solat">aqmal mansor</a>
    </div>
  );
};

export default AppRoot;
