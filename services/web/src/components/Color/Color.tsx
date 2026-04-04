interface ColorPops {
  color?: string;
}

const Color = ({ color }: ColorPops) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: color,
        border: "1px solid black",
      }}
    />
  );
};

export default Color;
