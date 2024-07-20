import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from './routes'
import { DefaultLayout } from './components/Layout'
import { Fragment } from "react";
import MainLayout from "./adminPages/mainLayout";
import './App.css'


function App() {
  return (
    <Router>
      <div>
        <Routes>
        {/* client route*/}
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          })}

          {/* Admin route*/}
          {privateRoutes.map((route, index) => {
            const Page = route.component
            let Layout = route.layout || MainLayout
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          })}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
