import { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Clear } from "./clear.svg";
// -------------------------------------------------------------------------------------
const Container = styled.div`
  font-family: "Arial";
  display: flex;
  width: 100%;
  height: auto !important;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
  ${(props) => (props.isError ? "border-color:red" : "border-color:black")};
  &:hover {
    box-shadow: 1px 1px 1px thistle;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0;
  align-items: center;
  min-width: 0;
`;

const Item = styled.div`
  margin: 2px 5px;
  padding: 2px;
  font-weight: bold;
  background: #64b5f6;
  border-radius: 10px;
  padding: auto 5px;
`;

const TextInput = styled.input`
  flex: 1 0;
  min-width: 50px;
  min-height: 25px;
  font-size: inherit;
  background-color: transparent;
  padding-left: 5px;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.div`
  flex: 0 0;
`;
// -------------------------------------------------------------------------------------

const MultiValueClearableInput = ({
  placeholder,
  receiveData,
  selectedValues,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState(selectedValues);

  useEffect(() => {
    if (selectedValues) setValues(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    if (values) receiveData(values);
  }, [values]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        const value = inputValue.trim();
        if (value.length > 0) {
          setValues([...values, value]);
        }
        setInputValue("");
      } else if (event.key === "Backspace" || event.keyCode === 8) {
        if (inputValue.length === 0 && values.length > 0) {
          setValues(values.slice(0, -1));
        }
      }
    },
    [inputValue, values]
  );

  return (
    <Container>
      <InputContainer>
        {values.map((value, index) => (
          <Item key={`${value}-${index}`}>
            {value}{" "}
            <p
              style={{
                display: "inline",
                cursor: "pointer",
                color: "blue",
                padding: "0 5px",
              }}
            >
              <span
                onClick={() => {
                  const index = values.indexOf(value);
                  if (index > -1) {
                    const data = [...values];
                    data.splice(index, 1);
                    setValues(data);
                  }
                }}
              >
                <b>x</b>
              </span>
            </p>
          </Item>
        ))}
        <TextInput
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          placeholder={values.length === 0 ? placeholder : ""}
        />
      </InputContainer>
      {values?.length > 0 ? (
        <Icon>
          <Clear
            width="20px"
            height="20px"
            stroke="black"
            onClick={() => {
              setInputValue("");
              setValues([]);
            }}
          />
        </Icon>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default memo(MultiValueClearableInput);

// -------------------------------------------------------------------------------------
