import React, {useState} from "../../_snowpack/pkg/react.js";
export const Icon = ({
  label,
  onClick,
  style
}) => /* @__PURE__ */ React.createElement("i", {
  style,
  onClick,
  className: `fa fa-${label}`
});
export const Copy = ({content}) => {
  const handleClick = () => {
    navigator.clipboard.writeText(content).then((x) => alert("copied!"));
  };
  return /* @__PURE__ */ React.createElement(Icon, {
    style: {cursor: "pointer"},
    label: "copy",
    onClick: () => handleClick()
  });
};
export const Loader = () => /* @__PURE__ */ React.createElement("i", null, "Loading");
export const withLoader = ({
  promise,
  Component
}) => {
  const [content, setContent] = useState();
  if (!content) {
    promise().then((content2) => setContent(content2));
    return /* @__PURE__ */ React.createElement(Loader, null);
  }
  return /* @__PURE__ */ React.createElement(Component, {
    data: content
  });
};
export const Errors = ({errors}) => {
  const eErrors = Object.entries(errors);
  if (eErrors.length === 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "alert alert-danger"
  }, "Some errors were detected, please fix");
};
const InputComponent = ({
  name,
  value,
  placeholder,
  onChange,
  errors,
  type = "input"
}) => {
  const c = "form-control" + (+!!errors[name] ? " is-invalid" : "");
  if (type === "textarea") {
    return /* @__PURE__ */ React.createElement("textarea", {
      rows: 5,
      className: c,
      placeholder,
      value,
      onChange: (v) => onChange(v.target.value)
    });
  }
  return /* @__PURE__ */ React.createElement("input", {
    className: c,
    placeholder,
    value,
    onChange: (v) => onChange(v.target.value)
  });
};
export const Input = ({
  name,
  value,
  placeholder,
  onChange,
  errors,
  type = "input"
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React.createElement(InputComponent, {
    type,
    name,
    value,
    placeholder,
    onChange,
    errors
  }), /* @__PURE__ */ React.createElement("div", {
    className: "invalid-feedback"
  }, errors[name]));
};
