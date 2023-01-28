import { Box, Paragraph, Text } from "grommet";
import { Divider } from "../../components/Divider";

export const JoinDisclaimer = () => {
  return (
    <>
      <Paragraph fill size="small">
        Cyfeed — это закрытое сообщество, участие в котором мы решили сделать
        платным. Во-первых, это поможет нам больше работать над сообществом,
        во-вторых, это отличный фильтр и мотивация для будущих участников.
      </Paragraph>
      <Paragraph fill size="small">
        Перед добавлением участников мы стараемся планировать c ними короткий
        звонок, из-за этого новые участники могут добавляться немного долго :)
      </Paragraph>
      <Paragraph fill size="small">
        А еще мы запрещаем анонимные аккаунты (знаем, в ИБ такое любят), поэтому
        ожидаем, что вы предоставите реальную информацию о вас и уделите хотя бы
        минуту-другую для написания краткого intro.
      </Paragraph>
      <Box background="brand">
        <Text color="black" weight="bold" size="small">
          (!) Заявка на участние в сообществе cyfeed
        </Text>
      </Box>
      <Divider />
    </>
  );
};
