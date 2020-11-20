import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export interface IRouteViewProps {
  name?: string;
  path?: string;
  redirect?: string;
  component?: any;
  children?: IRouteViewProps[];
}

const Child = (props: IRouteViewProps) => {
  return (
    <>
      {props.children ? (
        props.children.map((item, index) => {
          if (item.redirect) {
            return <Redirect key={index} from={item.path} to={item.redirect}></Redirect>;
          }
          return (
            <Route
              key={index}
              path={item.path}
              render={props => {
                return (
                  item.component && (
                    <item.component {...props}>
                      <Child children={item.children} />
                    </item.component>
                  )
                );
              }}
            ></Route>
          );
        })
      ) : (
        <Route path={props.path} component={props.component}></Route>
      )}
    </>
  );
};

function RouteView(props: IRouteViewProps) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Child {...props} />
      </Switch>
    </Suspense>
  );
}
export default RouteView;
