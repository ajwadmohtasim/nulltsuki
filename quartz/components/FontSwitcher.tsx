// @ts-ignore
import fontSwitcherScript from "./scripts/fontswitcher.inline"
import styles from "./styles/fontswitcher.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"

const FontSwitcher: QuartzComponent = ({ displayClass }) => {
  return (
    <button class={classNames(displayClass, "fontswitcher")} type="button" aria-label="Switch font">
      <span aria-hidden="true">Aa</span>
    </button>
  )
}

FontSwitcher.beforeDOMLoaded = fontSwitcherScript
FontSwitcher.css = styles

export default (() => FontSwitcher) satisfies QuartzComponentConstructor
