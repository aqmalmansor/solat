interface ContainerComponentProps {
  fill?: boolean;
  id?: React.ComponentProps<"div">["className"];
  parentSalt?: React.ComponentProps<"div">["className"];
  salt?: React.ComponentProps<"div">["className"];
  children: React.ReactNode;
}

const Container = (props: ContainerComponentProps) => {
  const { fill, salt, children, parentSalt, id } = props;

  const containerSalt = salt ?? "";
  const containerDefaultStyle = "container mx-auto";
  const containerClassname = [containerSalt, containerDefaultStyle].join(" ");

  if (fill) {
    const parentContainerDefaultStyle = "w-screen";
    const parentContainerClassname = [
      parentSalt,
      parentContainerDefaultStyle,
    ].join(" ");

    return (
      <div id={id} className={parentContainerClassname}>
        <div className={containerClassname}>{children}</div>
      </div>
    );
  }

  return (
    <div id={id} className={containerClassname}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  fill: false,
};

export default Container;
