// @ts-check

import React, { useState, useRef, useEffect } from 'react';
import {
  Typography,
  TextField,
  Box,
  Button,
  FormLabel,
  Stack,
  CircularProgress
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { CloudUpload, Delete } from '@mui/icons-material';

/**
 * @import {
 *  CreateEventModelContext,
 *  CreateEventStepElementProps
 * } from "../views/Organizer/CreateEventPage";
 */

/**
 * @typedef {CreateEventStepElementProps} CreateEventBannerProps
 */

/**
 * @param {CreateEventBannerProps} props
 */
export default function CreateEventBanner({ context, step }) {
  const theme = useTheme();

  const fileInput = useRef(/** @type {HTMLInputElement | null} */(null));
  const [blobUrl, setBlobUrl] = useState(/** @type {string | null} */(null));
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFileDraggedOver, setIsFileDraggedOver] = useState(false);

  useEffect(() => {
    if (fileInput.current && context.get.bannerFile) {
      fileInput.current.files = context.get.bannerFile.files;
      fileInput.current.dispatchEvent(new Event("change", { "bubbles": true }));
    }
  }, [context.get.bannerFile, fileInput])

  useEffect(() => {
    if (context.get.bannerFile && context.get.bannerFile.files.length) {
      setBlobUrl(URL.createObjectURL(context.get.bannerFile.files[0]));
    } else {
      setBlobUrl((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
        return null;
      });
    }
  }, [context.get.bannerFile]);

  return (
    <Stack spacing={4}>
      {/* Banner Section */}
      <Typography variant="h4">Upload Banner</Typography>

      <Stack spacing={1}>
        <Typography variant="body1">
          Upload an image or enter a URL for your event banner.
        </Typography>

        <Typography variant="body1">
          Ideal banner images should be at least 1170 pixels wide by 504 pixels high.
        </Typography>
      </Stack>

      <Box sx={{ height: "15rem", background: theme.palette.grey[100] }}>
        {(context.get.bannerUri || blobUrl) ? (
          <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
            <Box
              component="img"
              sx={{
                height: "100%", width: "100%", objectFit: "cover"
              }}
              src={context.get.bannerUri || blobUrl || ""}
            />
            <CustomIconButton
              variant="contained"
              color="error"
              size="large"
              sx={{
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
              }}
              startIcon={<Delete />}
              onClick={() => {
                context.set.bannerFile(null);
                context.set.bannerUri("");
              }}
            />
          </Box>
        ) : isUploadingFile ? (
          <Stack direction="row" alignItems="center" height="100%">
            <Stack alignItems="center" width="100%" spacing={2}>
              <CircularProgress />
              <Typography color="textSecondary">
                Waiting for file input
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Button
            component="div"
            sx={{ height: "100%", width: "100%", textTransform: "inherit" }}
            onClick={() => {
              setIsUploadingFile(true);
              const elem = fileInput.current;
              if (elem) {
                elem.addEventListener("cancel", () => {
                  setIsUploadingFile(false);
                }, { once: true });

                elem.addEventListener("change", ({ currentTarget }) => {
                  const elem = /** @type {HTMLInputElement} */(currentTarget);

                  const dt = new DataTransfer();
                  for (const file of elem.files ?? []) {
                    dt.items.add(file);
                  }
                  context.set.bannerFile(dt);

                  if (dt.items.length) {
                    context.set.bannerUri("");
                  }

                  setIsUploadingFile(false);
                }, { once: true });

                elem.click();
              }
            }}
            onDragEnter={(e) => {
              if (!e.dataTransfer.types.includes("Files")) {
                return;
              }
              e.dataTransfer.dropEffect = "copy";
              setIsFileDraggedOver(true);
            }}
            onDragOver={(e) => {
              if (!e.dataTransfer.types.includes("Files")) {
                return;
              }
              e.preventDefault();
              e.dataTransfer.dropEffect = "copy";
              setIsFileDraggedOver(true);
            }}
            onDragLeave={() => {
              setIsFileDraggedOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsFileDraggedOver(false);

              const imageFiles
                = [...e.dataTransfer.files].filter(f => f.type.startsWith("image/"));

              if (imageFiles.length > 0) {
                const dt = new DataTransfer();
                for (const file of imageFiles) {
                  dt.items.add(file);
                }
                context.set.bannerFile(dt);

                if (dt.items.length) {
                  context.set.bannerUri("");
                }
              }
            }}
          >
            <Stack direction="row" alignItems="center" height="100%">
              <Stack alignItems="center" width="100%">
                {isFileDraggedOver ? (
                  <>
                    <CloudUpload color="primary" sx={{ fontSize: 64 }} />
                    <Typography color="primary">
                      Drop image here
                    </Typography>
                  </>
                ) : (
                  <>
                    <CloudUpload color="action" sx={{ fontSize: 64 }} />
                    <Typography color="textSecondary">
                      Click to upload banner image
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
          </Button>
        )}
      </Box>

      <Box display="none">
        <Box
          component="input"
          ref={fileInput}
          type="file"
          name="bannerFile"
          accept="image/*"
          hidden={true}
        />
      </Box>

      <Stack spacing={2}>
        <FormLabel component="label">
          Or enter banner image URL
        </FormLabel>
        <TextField
          fullWidth={true}
          name="bannerUri"
          placeholder="Enter banner image URL"
          type="url"
          value={context.get.bannerUri}
          disabled={!!context.get.bannerFile && !!context.get.bannerFile.files.length}
          onChange={(e) => context.set.bannerUri(e.target.value)}
          variant="outlined"
          size="medium"
        />
      </Stack>

      {/* Navigation Buttons */}
      <Stack direction="row-reverse" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: "10rem" }}
          onClick={() => {
            context.next();
          }}
        >
          Next
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{
            minWidth: "10rem",
            color: theme.palette.text.primary
          }}
          onClick={() => {
            context.prev();
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Stack>
  );
};

const CustomIconButton = styled(Button)({
  p: 0,
  minWidth: 0,
  maxWidth: 0,
  '& > span': {
    margin: 0,
  }
});
