import * as React from "react";
import { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
// import { useDataProvider, useNotify, useRedirect } from "react-admin";
import ListAltIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
// import { useForm } from "react-final-form";
// import CreateToolbar from "../../components/toolbar/createToolbar";
// import { httpClient } from "../../rest";

import { Formik, Form, Field } from "formik";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
import LinearProgress from '@material-ui/core/LinearProgress';

import QuillMention from "quill-mention";
import "quill-mention/dist/quill.mention.css";
import HistoryIcon from '@material-ui/icons/History';
const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" }
];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" }
];

Quill.register(
    {
      "modules/mentions": QuillMention,
    },
    true
);


const modules = {
  toolbar: false,

  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
      let values;

      if (mentionChar === "@") {
        values = atValues;
      } else {
        values = hashValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    }
  }
};

const validateCreation = (values) => {
  const errors = {};
  if (!values.body) {
    errors.body = ["Comment body is required"];
  }
  if (values.body) {
    let html = values.body;
    let string = html.replace(/<[^>]*>?/gm, "");
    let trimmed = string.trim();
    if (trimmed.length < 1) {
      errors.body = ["Comment must be longer then 1 characters"];
    }
  }
  return errors;
};

const Autoclaim = (activityStreamId) => {
  const [openReply, setOpenReply] = React.useState(false);
  const[fields, setFields]=useState([])
  const [showList, setShowList] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
//   const notify = useNotify();

  const handleOpeningReply = () => {
    setOpenReply(!openReply);
  };

  const handleShowList = () => {
    setShowList(!showList);
    setFields(proposalFields)
  };


  return (
    <div>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Off</Grid>
        <Grid item>
          <Switch
            onChange={handleOpeningReply}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />{" "}
        </Grid>
        <Grid item>On</Grid>
      </Grid>
      {openReply && (
        <div>
            <Button onClick={handleShowList}>
            <ListAltIcon/>
            Show
            </Button>
            <Button onClick={handleShowList}>
            <HistoryIcon/>
            History
            </Button>
          <Formik
            initialValues={{
              body: "",
            }}
            validate={validateCreation}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            //   handleSubmit({body:values.body});
            setTasks(operands)
            }}
          >
            {({ errors, isSubmitting, submitForm, isValid, dirty}) => {
              return (
                  <div>
                  <Form>
                    <label>Enter your query below</label>
                    <Field name="body">
                      {({ field }) => {
                        return (
                            <ReactQuill
                                name="body"
                                value={field.value}
                                onChange={field.onChange(field.name)}
                                modules={{ ...modules }}
                            />
                            
                        );
                      }}
                    </Field>
                    {errors.body ? (
                        <div>
                          {errors.body.map((error, index) => (
                              <p key={index}>{error}</p>
                          ))}
                        </div>
                    ) : null}
                    {isSubmitting &&
                            <LinearProgress></LinearProgress>}
                    <div style={{ display: "flex" }}>
                      <Button
                          variant="contained"
                          color="primary"
                          disabled={!(isValid && dirty) || isSubmitting}
                          onClick={submitForm}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                  {showList && (
                   
                   (fields.map((field) => (
          <h5>{field}</h5>
         
        )))
                  )}
             
                            <div>{tasks.length > 0 ?  (tasks.map((task) => (
          <h5>{task}</h5>
         
        ))): "nothing"}</div>
                   
                  </div>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};



const proposalFields = [
  "AdminArea1",
  "AdminArea8",
  "AdminArea9",
  "AnomalyCategory",
  "CenterPointPriority",
  "CenterPointPriorityName",
  "CenterPointTier",
  "CenterPointVia",
  "ClientId",
  "CompanyDepartment",
  "CountryCategory",
  "Dataset",
  "EmailAddress",
  "ExternalId",
  "ExternalStatus",
  "ExternalSubmissionDate",
  "Image",
  "Latitude",
  "Link to CFL",
  "Longitude",
  "Priority",
  "PriorityName",
  "PriorityValue",
  "Project Type",
  "ProjectName",
  "Quality",
  "SLAFlag",
  "Status",
  "SubStatus",
  "TaskFlavor",
  "TierName",
  "Time",
  "Username",
  "VIAName",
];
const operands = ["task1", "task2", "task3", "task4", "task5", "task6"];

const operand = operands.map((entry) => ({ title: entry }));
const list = proposalFields.map((value) => ({ title: value }));


export default Autoclaim;