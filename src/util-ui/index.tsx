import React, { useState } from "react";

export interface Error {
  [field: string]: string;
}

export const Icon = ({
  label,
  onClick,
  style,
}: {
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}) => <i style={style} onClick={onClick} className={`fa fa-${label}`}></i>;

export const Copy = ({ content }: { label?: string; content: string }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(content).then((x) => alert("copied!"));
  };
  return (
    <Icon
      style={{ cursor: "pointer" }}
      label="copy"
      onClick={() => handleClick()}
    />
  );
};

export const Loader = () => <i>Loading</i>;

export const withLoader = <A,>({
  promise,
  Component,
}: {
  promise: () => Promise<A>;
  Component: ({ data: A }) => JSX.Element;
}) => {
  const [content, setContent] = useState<A | undefined>();

  if (!content) {
    promise().then((content) => setContent(content));

    return <Loader />;
  }

  return <Component data={content} />;
};

export const Errors = ({ errors }: { errors: Error }) => {
  const eErrors = Object.entries(errors);
  if (eErrors.length === 0) {
    return <></>;
  }

  return (
    <div className="alert alert-danger">
      Some errors were detected, please fix
      {/*<ul>
        {eErrors.map(([k, v], i) => (
          <li key={i}>{v}</li>
        ))}
        </ul>*/}
    </div>
  );
};

const InputComponent = ({
  name,
  value,
  placeholder,
  onChange,
  errors,
  type = "input",
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  errors: Error;
  type?: "textarea" | "input";
}) => {
  const c = "form-control" + (+!!errors[name] ? " is-invalid" : "");
  if (type === "textarea") {
    return (
      <textarea
        rows={5}
        className={c}
        placeholder={placeholder}
        value={value}
        onChange={(v) => onChange(v.target.value)}
      />
    );
  }

  return (
    <input
      className={c}
      placeholder={placeholder}
      value={value}
      onChange={(v) => onChange(v.target.value)}
    />
  );
};

export const Input = ({
  name,
  value,
  placeholder,
  onChange,
  errors,
  type = "input",
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  errors: Error;
  type?: "textarea" | "input";
}) => {
  return (
    <div className="form-group">
      <InputComponent
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        errors={errors}
      />

      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};
