import React from "react";
import TableLive from "../demos/TableLive.jsx";
import FormValidate from "../demos/FormValidate.jsx";
import InputTypes from "../demos/InputTypes.jsx";
import SelectLive from "../demos/SelectLive.jsx";
import TextareaCounter from "../demos/TextareaCounter.jsx";
import ProgressAnim from "../demos/ProgressAnim.jsx";
import MeterAnim from "../demos/MeterAnim.jsx";
import DetailsToggle from "../demos/DetailsToggle.jsx";
import DialogModal from "../demos/DialogModal.jsx";
import LinkDemo from "../demos/LinkDemo.jsx";
import ImgFallback from "../demos/ImgFallback.jsx";
import MediaDemo from "../demos/MediaDemo.jsx";
import CanvasDraw from "../demos/CanvasDraw.jsx";
import GenericDemo from "../demos/GenericDemo.jsx";
import BaseDemo from "../demos/BaseDemo.jsx";

const PRESETS = {
  "table-live": TableLive,
  "form-validate": FormValidate,
  "input-types": InputTypes,
  "select-live": SelectLive,
  "textarea-counter": TextareaCounter,
  "progress-anim": ProgressAnim,
  "meter-anim": MeterAnim,
  "details-toggle": DetailsToggle,
  "dialog-modal": DialogModal,
  link: LinkDemo,
  "img-fallback": ImgFallback,
  media: MediaDemo,
  "canvas-draw": CanvasDraw,
  "base-demo": BaseDemo,
};

export default function DemoRenderer({ demo, entry }) {
  const Preset = PRESETS[demo] || GenericDemo;
  return <Preset entry={entry} />;
}
