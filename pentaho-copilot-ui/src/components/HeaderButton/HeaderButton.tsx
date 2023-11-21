import {
  FloatingFocusManager,
  autoUpdate,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from "@floating-ui/react";

import { HvButton } from "@hitachivantara/uikit-react-core";
import { Chat } from "@hitachivantara/uikit-react-icons";

import { withProvider } from "providers/Provider";
import { ChatContextProvider } from "providers/ChatContext";
import ChatPanel from "components/ChatPanel";
import { useRefreshSafeState } from "utils/useRefreshSafeState";

const HeaderButton: React.FC = () => {
  const [isOpen, setIsOpen] = useRefreshSafeState("assistant-open", false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(20),
      shift(),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight - 5}px`
          });
        }
      })
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context, {
    toggle: true
  });
  const dismiss = useDismiss(context, {
    enabled: false
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  return (
    <ChatContextProvider>
      <HvButton ref={refs.setReference} {...getReferenceProps()} icon>
        <Chat />
      </HvButton>
      {isOpen && (
        <FloatingFocusManager
          context={context}
          modal={false}
          closeOnFocusOut={false}
        >
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <ChatPanel
              onClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </FloatingFocusManager>
      )}
    </ChatContextProvider>
  );
};

export default withProvider(HeaderButton);
