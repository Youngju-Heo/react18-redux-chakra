/* eslint-disable no-console */
import React from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LocationInfo, locBaseUrl, locLocation, locMoveTo } from "../store/router/router-slice";
import { RootState } from "../store";

interface RouteManagerPrivateProps {
  children: React.ReactNode;
  baseUrl: string;
  moveTo: string;
  location: LocationInfo;
  locBaseUrl: (param: { baseUrl: string; path: LocationInfo }) => void;
  locLocation: (location: LocationInfo) => void;
  locMoveTo: (moveTo: string) => void;
}

const RouteManagerPrivate = (props: RouteManagerPrivateProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("RouteManager location", location);
  React.useEffect(() => {
    const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
    console.log("init", location);
    let pathName = location.pathname;
    if (pathName.startsWith(baseUrl)) {
      pathName = `/${pathName.substring(baseUrl.length)}`;
    }
    props.locBaseUrl({
      baseUrl: baseUrl,
      path: {
        pathname: pathName,
        search: location.search,
        hash: location.hash,
        state: location.state,
      },
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const nextLocation = props.moveTo.startsWith("/")
      ? `${props.baseUrl}${props.moveTo.substring(1)}`
      : `${props.baseUrl}${props.moveTo}`;
    navigate(nextLocation);
    // eslint-disable-next-line
  }, [props.moveTo]);

  React.useEffect(() => {
    const srcPath = location.pathname;
    let baseUrl = props.baseUrl;
    if (baseUrl.length === 0) {
      baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
    }
    if (baseUrl.length > 0) {
      const nextPath = srcPath.startsWith(baseUrl) ? `/${srcPath.substring(baseUrl.length)}` : srcPath;
      if (
        nextPath !== props.location.pathname ||
        props.location.hash !== location.hash ||
        props.location.search !== location.search ||
        props.location.state !== location.state
      ) {
        props.locLocation({
          pathname: nextPath,
          search: location.search,
          hash: location.hash,
          state: location.state,
        });
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

const mapStateToProps = (state: RootState) => ({
  baseUrl: state.router.baseUrl,
  moveTo: state.router.moveTo,
  location: state.router.location,
});

const RouteManagerInternal = connect(mapStateToProps, {
  locBaseUrl,
  locLocation,
  locMoveTo,
})(RouteManagerPrivate);

////////////////////////////////////////////////////////////////////////////////
// for RouteManager
interface RouteManagerProps {
  children: React.ReactNode;
}

const RouteManager = (props: RouteManagerProps): JSX.Element => {
  return (
    <BrowserRouter>
      <RouteManagerInternal>{props.children}</RouteManagerInternal>
    </BrowserRouter>
  );
};

export default RouteManager;
