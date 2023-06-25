import { ReactElement, useState } from "react";

interface HoverModalProps {
  title: string;
  text: string;
}

export default function HoverModal({
  title,
  text,
}: HoverModalProps): ReactElement {
  const [show, showModal] = useState(false);

  return show ? (
    <div className="relative">
      <a
        className="text-gray-500 hover:text-black truncate"
        onClick={() => showModal(true)}
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {text.length > 10 ? `${text.slice(0, 10)}...` : text}
      </a>
      <div
        className="fixed left-0 top-0 z-[1055] bg-white dark:bg-neutral-600 h-full w-full overflow-y-auto overflow-x-hidden outline-none flex items-center justify-center"
        id={`modal-${title}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
          data-te-modal-dialog-ref
        >
          <div className="flex shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id={`modal-title-${title}`}
            >
              {title}
            </h5>
          </div>
          <div
            className="relative flex-auto p-4 h-[300px] min-h-80vh"
            data-te-modal-body-ref
          >
            <div className="whitespace-normal break-words">{text}</div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => showModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative">
      <a
        className="text-gray-500 hover:text-black truncate"
        onClick={() => showModal(true)}
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {text.length > 10 ? `${text.slice(0, 10)}...` : text}
      </a>
    </div>
  );
}
