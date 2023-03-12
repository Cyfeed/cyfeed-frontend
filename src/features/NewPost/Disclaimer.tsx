import { Markdown } from "grommet";

type Props = {};

const CONTENT = `Здесь ты можешь подготовить материал, добавить ссылку на внешнюю статью или просто задать вопрос сообществу.
Обязательно прочитай <a>рекомендации</a> о оформлению материалов.`;

export const Disclaimer = (props: Props) => {
  return <Markdown>{CONTENT}</Markdown>;
};
