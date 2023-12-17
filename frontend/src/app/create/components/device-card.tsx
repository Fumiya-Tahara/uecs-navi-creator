import Card from "@mui/material/Card";

interface DeviceCardProps {
  deviceName: string;
}

export function DeviceCard(props: DeviceCardProps) {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#D9D9D9",
          borderRadius: "10px",
          width: "100%",
          aspectRatio: "5/2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>{props.deviceName}</div>
      </Card>
    </>
  );
}
