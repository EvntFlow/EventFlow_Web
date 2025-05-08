// @ts-check

import React, { useCallback, useEffect, useRef, useState } from "react";
import CreateEventDetails from "../../components/CreateEventDetails";
import CreateEventBanner from "../../components/CreateEventBanner";
import CreateEventTickets from "../../components/CreateEventTickets";
import CreateEventReview from "../../components/CreateEventReview";
import { useSearchParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import CreateEventStepper from "../../components/CreateEventStepper";
import Authorized from "../../components/Authorized";
import { getCategories } from "../../backend";
import { getApiUrl } from "../../api";

/**
 * @import { Dispatch, SetStateAction } from "react";
 * @import Category from "../../models/Category";
 */

/**
 * @typedef CreateEventModel
 * @property {string} name
 * @property {string[]} category
 * @property {Date | null} startDate
 * @property {Date | null} endDate
 * @property {string} location
 * @property {string} description
 * @property {string} bannerUri
 * @property {DataTransfer | null} bannerFile
 * @property {number} price
 * @property {string[]} ticketName
 * @property {number[]} ticketPrice
 * @property {number[]} ticketCount
 */

/**
 * @typedef {keyof CreateEventModel} CreateEventModelKey
 */

/**
 * @typedef CreateEventModelContext
 * @property {CreateEventModel} get
 * @property {{ [ K in CreateEventModelKey ]: Dispatch<SetStateAction<CreateEventModel[K]>> }} set
 * @property {Category[] | null} availableCategories
 * @property {number} step
 * @property {() => any} next
 * @property {() => any} prev
 */

/**
 * @typedef CreateEventStepElementProps
 * @property {CreateEventModelContext} context
 * @property {number} step
 */

/**
 * @typedef CreateEventStep
 * @property {string} name
 * @property {string} title
 * @property {(props: CreateEventStepElementProps) => React.ReactNode} element
 */

/** @type {CreateEventStep[]} */
const steps = [
  {
    name: "Edit",
    title: "Create a new event",
    element: (props) => <CreateEventDetails {...props} />
  },
  {
    name: "Banner",
    title: "Edit banner",
    element: (props) => <CreateEventBanner {...props} />
  },
  {
    name: "Ticketing",
    title: "Edit tickets",
    element: (props) => <CreateEventTickets {...props} />
  },
  {
    name: "Review",
    title: "Review",
    element: (props) => <CreateEventReview {...props} />
  }
];

export default function CreateEventPage() {

  /** @type {CreateEventModelContext} */
  // @ts-ignore
  const context = { step: 0, get: {}, set: {} };

  /**
   * @template {CreateEventModelKey} const T
   * @param {T} key
   * @param {CreateEventModel[T]} value
   */
  function useModelInit(key, value) {
    const [ get, set ] = useState(value);
    context.get[key] = get;
    context.set[key] = /** @type {CreateEventModelContext["set"][T]} */(set);
  }

  useModelInit("name", "");
  useModelInit("category", []);
  useModelInit("startDate", null);
  useModelInit("endDate", null);
  useModelInit("location", "");
  useModelInit("description", "");
  useModelInit("bannerUri", "");
  useModelInit("bannerFile", null);
  useModelInit("price", 0.0);
  useModelInit("ticketName", []);
  useModelInit("ticketPrice", []);
  useModelInit("ticketCount", []);

  let setAvailableCategories;
  [ context.availableCategories, setAvailableCategories ]
    = useState(/** @type {Category[] | null} */(null));

  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  context.step = step;

  useEffect(() => {
    (async function() {
      setAvailableCategories(await getCategories());
    })();
  }, [setAvailableCategories]);

  useEffect(() => {
    let step = 0;
    if (searchParams.has("step")) {
      const stepTry = Number.parseInt(searchParams.get("step") ?? "");
      if (!Number.isNaN(stepTry) && stepTry >= 0 && stepTry < steps.length) {
        step = stepTry;
      }
    }
    setStep(step);
  }, [searchParams]);

  context.next = useCallback(() => {
    if (context.step + 1 < steps.length) {
      if (formRef.current?.reportValidity()) {
        setSearchParams((params) => {
          params.set("step", `${context.step + 1}`);
          return params;
        });
      }
    }
  }, [context.step, setSearchParams]);

  context.prev = useCallback(() => {
    if (context.step - 1 >= 0) {
      setSearchParams((params) => {
        params.set("step", `${context.step - 1}`);
        return params;
      });
    }
  }, [context.step, setSearchParams]);

  useEffect(() => {
    setSearchParams((params) => {
      if (params.has("name")) {
        context.set.name(params.get("name") || "");
        params.delete("name");
      } else if (params.has("category")) {
        context.set.category(params.getAll("category"));
        params.delete("category");
      } else if (params.has("startDate")) {
        const date = Date.parse(params.get("startDate") || "");
        if (!Number.isNaN(date)) {
          context.set.startDate(new Date(date));
        }
        params.delete("startDate");
      } else if (params.has("endDate")) {
        const date = Date.parse(params.get("endDate") || "");
        if (!Number.isNaN(date)) {
          context.set.endDate(new Date(date));
        }
        params.delete("endDate");
      } else if (params.has("location")) {
        context.set.location(params.get("location") || "");
        params.delete("location");
      } else if (params.has("description")) {
        context.set.description(params.get("description") || "");
        params.delete("description");
      } else if (params.has("bannerUri")) {
        context.set.bannerUri(params.get("bannerUri") || "");
        params.delete("bannerUri");
      } else if (params.has("price")) {
        const price = Date.parse(params.get("price") || "");
        if (!Number.isNaN(price)) {
          context.set.price(price);
        }
        params.delete("price");
      } else if (params.has("ticketName")) {
        context.set.ticketName(params.getAll("ticketName"));
        params.delete("ticketName");
      } else if (params.has("ticketPrice")) {
        context.set.ticketPrice(params.getAll("ticketPrice").map(Number.parseFloat));
        params.delete("ticketPrice");
      } else if (params.has("ticketCount")) {
        context.set.ticketCount(params.getAll("ticketCount").map(Number.parseInt));
        params.delete("ticketCount");
      }
      return params;
    });
  }, [setSearchParams, context.set]);

  const formRef = useRef(/** @type {HTMLFormElement | null} */(null));

  return (
    <Stack spacing={3} sx={{ py: 8, px: 6 }}>
      <Authorized role="organizer" />
      <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
        {steps[context.step].title}
      </Typography>

      <Box sx={{ py: 4 }}>
        <CreateEventStepper
          activeStep={context.step}
          steps={steps}
        />
      </Box>

      <form
        ref={formRef}
        method="post"
        encType="multipart/form-data"
        action={getApiUrl("Event", {
          returnUrl: searchParams.has("returnUrl") ?
            searchParams.get("returnUrl") : "/Event/Manage?isCreated=1"
        })}
      >
        {steps.map((step, index) =>
          <Box key={index} display={ index === context.step ? "block" : "none" }>
            {step.element({ "context": context, step: index })}
          </Box>
        )}
      </form>
    </Stack>
  )
}
