import Header from "@/app/components/header/Header";
import Hotels from "@/app/components/hotels/Hotels";
import Text from "@/app/components/text/Text";
import TextColumn from "@/app/components/text/TextColumn";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <Header />
      <div className="panel">
        <section className="container">
          <Text heading={<h1>{t("intro.heading")}</h1>} sub={t("intro.sub")}>
            <TextColumn>{tags => t.rich("intro.column1", tags)}</TextColumn>
            <TextColumn>{tags => t.rich("intro.column2", tags)}</TextColumn>
          </Text>
        </section>
        <div className="container-thin">
          <section className="showcase">
            <Hotels defaultSort={"price_asc"} />
          </section>
        </div>
      </div>
      <section className="panel callout">
        <div className="container-thin">
          <Text heading={<h2>{t("design.heading")}</h2>}>
            <TextColumn>{tags => t.rich("design.column1", tags)}</TextColumn>
          </Text>
        </div>
      </section>
      <section className="panel">
        <div className="container-thin">
          <Text heading={<h2>{t("architecture.heading")}</h2>}>
            <TextColumn>{tags => t.rich("architecture.column1", tags)}</TextColumn>
          </Text>
        </div>
      </section>
      <section className="panel callout">
        <div className="container-thin">
          <Text heading={<h2>{t("accessibility.heading")}</h2>}>
            <TextColumn>{tags => t.rich("accessibility.column1", tags)}</TextColumn>
          </Text>
        </div>
      </section>
    </>
  );
}