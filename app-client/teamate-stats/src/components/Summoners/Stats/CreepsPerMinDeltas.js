import React from "react";
import gql from "graphql-tag";
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import { Query } from "react-apollo";
import ReactLoading from "react-loading";
import "./graphs.css";
import { Alert } from "antd";

const GET_CREEPS_PER_MIN = gql`
  query($userId: String!, $summonerName: String!, $server: String!) {
    getCreepsPerMinDeltas(
      userId: $userId
      summonerName: $summonerName
      server: $server
    ) {
      type
      value
      gameCounter
    }
  }
`;
const scale = {
  value: { min: 0 }
};
const CreepsPerMinDeltas = props => {
  return (
    <Query
      query={GET_CREEPS_PER_MIN}
      variables={{
        userId: props.userId,
        summonerName: props.summonerName,
        server: props.server
      }}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <ReactLoading
              type={"bubbles"}
              color={"#0a253e"}
              height={100}
              width={100}
              className="loader-graph"
            />
          );
        if (error)
          return (
            <Alert
              message=" An Error Occurred"
              description="Please refresh the page"
              type="error"
            />
          );
        return (
          <Chart
            height={400}
            data={data.getCreepsPerMinDeltas}
            scale={scale}
            forceFit
          >
            <Axis name="gameCounter" />
            <Axis name="value" />
            <Legend />
            <Tooltip crosshairs={{ type: "line" }} />
            <Geom
              type="area"
              position="gameCounter*value"
              color="type"
              size={2}
            />
          </Chart>
        );
      }}
    </Query>
  );
};

export default CreepsPerMinDeltas;
