import {
  HvAvatar,
  HvCarousel,
  HvCarouselSlide,
  HvTypography
} from "@hitachivantara/uikit-react-core";

import { useChatContext } from "providers/ChatContext";
import styles from "./styles";
import { v4 as uuidv4 } from "uuid";
import { cx } from "@emotion/css";
const baseUrl = import.meta.resolve?.(
  "@hv-apps/genai-companion/"
) as unknown as string;

const companionList = [
  {
    name: "Configuration Sentinel",
    description:
      "A conservative companion excelling at support by diligently safeguarding system settings and ensuring optimal performance.",
    details: [
      {
        label: "Squad",
        detail: "IT Infrastructure"
      },
      {
        label: "Temperature",
        detail: "Cold"
      },
      {
        label: "Content",
        detail: "Well-defined"
      },
      {
        label: "Recommended for",
        detail: "HCP, Ops Center..."
      },
      {
        label: "Training datasets",
        detail: "Logs, tickets, documentation"
      },
      {
        label: "Training type",
        detail: "Fine-tuned"
      }
    ]
  },
  {
    name: "Help Helsman",
    description:
      "A conservative companion excelling at support by diligently safeguarding system settings and ensuring optimal performance.",
    details: [
      {
        label: "Squad",
        detail: "IT Infrastructure"
      },
      {
        label: "Temperature",
        detail: "Medium"
      },
      {
        label: "Content",
        detail: "Intermediate"
      },
      {
        label: "Recommended for",
        detail: "HCP, Ops Center..."
      },
      {
        label: "Training datasets",
        detail: "Logs, tickets, customer preferences"
      },
      {
        label: "Training type",
        detail: "Customer-driven"
      }
    ]
  },
  {
    name: "Crazy Ally",
    description:
      "A well-balanced customer-focused companion that provides reliable assistance and guidance while always taking your preferences into account.",
    details: [
      {
        label: "Squad",
        detail: "IT Infrastructure"
      },
      {
        label: "Temperature",
        detail: "Ultra hot"
      },
      {
        label: "Content",
        detail: "Strategic"
      },
      {
        label: "Recommended for",
        detail: "HCP, Ops Center..."
      },
      {
        label: "Training datasets",
        detail: "Use cases, Ecosystems"
      },
      {
        label: "Training type",
        detail: "Computation"
      }
    ]
  }
];

const NewChat = () => {
  const classes = styles;
  const { setSessionId } = useChatContext();
  const { setTabId } = useChatContext();
  const { setNewChat } = useChatContext();
  const { setHistory } = useChatContext();
  const { setSelectedCompanion } = useChatContext();

  const companionHandler = (companion: any) => {
    setSelectedCompanion(companion.name);
    setNewChat(false);
    setTabId(0);
    setHistory(false);
    setSessionId(uuidv4());
  };

  return (
    <>
      <HvCarousel
        carouselOptions={{
          loop: false
        }}
        showSlideControls={true}
        hideThumbnails={false}
      >
        {companionList.map((companion: any, index: number) => (
          <HvCarouselSlide className={classes.section} key={index}>
            <div className={classes.mainSection}>
              <HvAvatar
                size="xl"
                variant="square"
                className={classes.avatar}
                onClick={() => companionHandler(companion)}
                alt={companion.name}
                src={`${baseUrl}images/${companion.name}.png`}
              ></HvAvatar>
              <div>
                <HvTypography variant="title4">{companion.name}</HvTypography>
                <HvTypography variant="body">
                  {companion.description}
                </HvTypography>
              </div>
            </div>
            <div className={cx(classes.mainSection, classes.otherSection)}>
              {companion.details.map((details: any) => (
                <div className={classes.item} key={details.label}>
                  <HvTypography variant="label">{details.label}</HvTypography>
                  <HvTypography variant="body">{details.detail}</HvTypography>
                </div>
              ))}
            </div>
          </HvCarouselSlide>
        ))}
      </HvCarousel>
    </>
  );
};

export default NewChat;
