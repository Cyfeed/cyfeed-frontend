import { Box, Markdown, Paragraph, Text } from "grommet";
import styled from "styled-components";
import { IGetUserByIdResponse } from "../../api/types/getUserById";
import { Divider } from "../../components/Divider";

type Props = {
  data: IGetUserByIdResponse;
};

export const ProfileData = ({ data }: Props) => {
  return (
    <>
      <Box>
        <Text color="brand" size="small">
          - профиль:
        </Text>
        <TextKVPair k="имя:" v={`${data.firstname} ${data.lastname}`} />
        <TextKVPair k="присоединился:" v={data.details.joinedAt} />
        <TextKVPair k="статус:" v={data.status} />
      </Box>
      <Box margin={{ top: "medium" }}>
        <Text color="brand" size="small">
          - профессия:
        </Text>
        <TextKVPair k="компания:" v={data.details.work} />
        <TextKVPair k="роль:" v={data.details.position} />
      </Box>
      {data.details.networks?.length && (
        <Box margin={{ top: "medium" }}>
          <Text color="brand" size="small">
            - контакты:
          </Text>
          {data.details.networks?.map((network) => {
            return <TextKVPair k={network.type} v={network.link} />;
          })}
        </Box>
      )}
      <Box margin={{ top: "medium" }}>
        <Text color="brand" size="small">
          - интро:
        </Text>
        <Box pad={{ left: "32px" }}>
          <Divider />
          <IntroMD
            components={{
              p: <Paragraph size="small" />,
            }}
          >
            {`${data.introduction}`}
          </IntroMD>
          <Divider />
        </Box>
      </Box>
    </>
  );
};

const IntroMD = styled(Markdown)`
  font-size: 14px;
`;

const TextKVPair = ({ k, v }: { k: string; v?: string }) => {
  if (!v) {
    return null;
  }

  return (
    <Box pad={{ left: "32px" }} direction="row" gap="small">
      <Text color="brand" size="small">
        {k}
      </Text>
      <Paragraph margin="none" color="white" size="small">
        {v}
      </Paragraph>
    </Box>
  );
};
