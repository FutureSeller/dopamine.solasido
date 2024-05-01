"use client";

import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const MODAL_DISMISS_ACTION = "modal-dismiss";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss: MouseEventHandler<HTMLElement> = (e) => {
    if (
      (e.target as HTMLElement).dataset["dissmissAction"] !==
      MODAL_DISMISS_ACTION
    ) {
      return;
    }
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return createPortal(
    <div
      tabIndex={-1}
      className="overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-screen h-screen bg-gray-100 bg-opacity-50 text-white"
      data-dissmiss-action={MODAL_DISMISS_ACTION}
      onClick={onDismiss}
      aria-hidden
    >
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative rounded-lg shadow bg-black">
          <div className="flex items-center justify-between p-2 border-b rounded dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-dissmiss-action={MODAL_DISMISS_ACTION}
              onClick={onDismiss}
            >
              <svg
                className="w-3 h-3 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden
                tabIndex={-1}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">닫기</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
