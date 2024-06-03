import Loading from "@/renderer/components/Loading";
import "./index.scss";
import useRemoteThemes from "./hooks/useRemoteThemes";
import SwitchCase from "@/renderer/components/SwitchCase";
import { RequestStateCode } from "@/common/constant";
import ThemeItem from "../ThemeItem";
import ThemePack from "@/shared/themepack/renderer";
import { Trans, useTranslation } from "react-i18next";
import A from "@/renderer/components/A";

export default function RemoteThemes() {
  const [themes, loadingState] = useRemoteThemes();
  const currentTheme = ThemePack.useCurrentThemePack();
  const { t } = useTranslation();

  return (
    <div className="remote-themes-container">
      <div className="remote-themes-description">
        <Trans
          i18nKey={"theme.how_to_submit_new_theme"}
          components={{
            Github: (
              <A href="https://github.com/maotoumao/MusicFreeThemePacks"></A>
            ),
          }}
        ></Trans>
      </div>
      <SwitchCase.Switch switch={loadingState}>
        <SwitchCase.Case case={RequestStateCode.PENDING_FIRST_PAGE}>
          <Loading></Loading>
        </SwitchCase.Case>
        <SwitchCase.Case case={RequestStateCode.FINISHED}>
          <div className="remote-themes-inner-container">
            {themes.map((it) => (
              <ThemeItem
                config={it.config}
                key={it.publishName}
                type="remote"
                selected={it.hash && it.hash === currentTheme?.hash}
              ></ThemeItem>
            ))}
          </div>
        </SwitchCase.Case>
      </SwitchCase.Switch>
    </div>
  );
}
