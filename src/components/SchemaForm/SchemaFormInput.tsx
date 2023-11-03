import { Field } from "./models";

interface SchemaFormInputProps {
  field: Field;
  value: any;
  readOnly?: boolean;
}

const defaultRows = 8;

/** SchemaFormInput is responsible for rendering the actual input component. */
const SchemaFormInput = ({
  field,
  value,
  readOnly,
}: SchemaFormInputProps) => {
  const { name, type, required } = field;
  // TODO: make id unique in a deterministic fashion
  switch (type) {
    case "SingleLineText":
      return (
        <input
          className="form-control"
          type="text"
          defaultValue={value}
          required={required}
          readOnly={readOnly}
          id={name}
        />
      );
    case "MultiLineText":
      return (
        <textarea
          className="form-control"
          rows={field.rows ?? defaultRows}
          defaultValue={value}
          required={required}
          readOnly={readOnly}
          id={name}
        />
      );
    case "SingleCheckbox":
      // FIXME: Required checkboxes fail in a funny way.
      return (
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={!!value}
          required={required}
          disabled={readOnly}
          id={name}
        />
      );
    case "SingleSelect":
      return (
        <select
          className="form-select"
          required={required}
          disabled={readOnly}
          id={name}
        >
          {field.choices?.map((choice) => (
            <option value={choice.value} key={choice.value} selected={value === choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      );
    default:
      throw new Error(`field.type not implemented: ${field.type}`);
  }
};

export default SchemaFormInput;
