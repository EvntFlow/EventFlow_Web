// @ts-check

import React, { useEffect, useState } from "react";
import { Chip, Select, Stack, Typography } from "@mui/material";

/**
 * @import { SelectProps } from "@mui/material";
 * @import Category from "../models/Category";
 */

/**
 * @typedef CategorySelectOwnProps
 * @property {string=} placeholder
 * @property {Category[] | null} categories
 */

/**
 * @typedef {SelectProps<string[]> & CategorySelectOwnProps} CategorySelectProps
 */

/**
 * @param {CategorySelectProps} props
 */

export default function CategorySelect(props) {
  const {
    placeholder, categories,
    multiple, value, onChange, renderValue,
    ...rest
  } = props;

  const [categoryMap, setCategoryMap] = useState(/** @type {Map<string, Category>} */(new Map()));

  useEffect(() => {
    if (categories) {
      setCategoryMap(new Map(categories.map(c => [c.id, c])));
    } else {
      setCategoryMap(new Map());
    }
  }, [categories]);

  return (
    <Select
      multiple={true}
      value={(value && Array.isArray(value) && value.length) ? value : ["invalid"]}
      onChange={(e) => {
        const realValue = Array.isArray(e.target.value) ?
          e.target.value.filter(v => categoryMap.has(v)) : [ e.target.value ]

        /** @type {typeof e} */
        let shadow;

        shadow = { ...e };
        shadow.target = { ...e.target };
        shadow.target.value = realValue;

        onChange?.apply(this, [shadow]);
      }}
      renderValue={(value) => {
        if (!value || !value.length || (value.length === 1 && value[0] === "invalid")) {
          return (
            <Typography color="textDisabled">
              {placeholder}
            </Typography>
          )
        } else {
          return (
            <Stack direction="row" spacing={1}>
              {value.filter(v => categoryMap.has(v)).map((id) =>
                <Chip
                  variant="filled"
                  label={categoryMap.get(id)?.name}
                  key={id}>
                </Chip>
              )}
            </Stack>
          )
        }
      }}
      {...rest}
    />
  )
}
