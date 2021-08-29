import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Application from './component/courseApplication/application';
import AppliedCourses from './component/courseApplication/appliedCourses';
import CourseApplication from "./component/courseApplication/courseApplicationHome";
import CourseHome from "./component/courseRating/courseHome";
import CourseSelection from './component/Grades/CourseSelection';
import Evaluation from './component/courseRating/evaluation';
import ForgetPassword from './component/profileManagement/forgetPassword';
import Grade from './component/Grades/Grade';
import LoginPage from './component/profileManagement/LoginPage';
import MarkingPage from './component/Grades/MarkingPage';
import ProfileInfo from './component/profileManagement/ProfileInfo';
import RegistrationPage from './component/profileManagement/registrationPage';
import ResetPasswordPage from './component/profileManagement/resetPasswordPage';
import Residence from './component/residencePage/residence';
import Login from './component/LibraryManagement/Login';
import profile from './component/LibraryManagement/Profile';
import SideBar from './component/courseRating/sideBar';
import UpdateProfile from './component/profileManagement/updateProfile';
import ViewGrade from './component/Grades/viewGrades';
import HomePage from './component/Home/homePage';
import Contact from './component/Home/Contact';
import ViewFeedback from './component/Grades/viewFeedback';
import LexChat from "react-lex";
import SearchBar from './component/LibraryManagement/searchBar';
import Details from './component/LibraryManagement/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/sideBar" component={SideBar}></Route>
          <Route exact path="/courseHome" component={CourseHome}></Route>
          <Route exact path="/evaluation/:id" component={Evaluation}></Route>
          <Route exact path="/application" component={CourseApplication}></Route>
          <Route exact path="/apply/:id" component={Application}></Route>
          <Route exact path="/appliedCourses" component={AppliedCourses}></Route>
          <Route exact path="/grades/gradeHome/:id" component={Grade}></Route>
          <Route exact path="/grades/courseSelection" component={CourseSelection}></Route>
          <Route exact path="/grades/markingPage/:id" component={MarkingPage}></Route>
          <Route exact path="/RegistrationPage" component={RegistrationPage}></Route>
          <Route path="/LoginPage" exact component={LoginPage}></Route>
          <Route path="/ForgetPassword" exact component={ForgetPassword}></Route>
          <Route path="/ResetPasswordPage" exact component={ResetPasswordPage}></Route>
          <Route path="/UpdateProfilePage" exact component={UpdateProfile}></Route>
          <Route exact path="/HomePage/:ID" component={CourseHome}></Route>
          <Route path="/grades/viewGrades" exact component={ViewGrade}></Route>
          <Route exact path="/profilehome" component={ProfileInfo}></Route>
          <Route exact path="/residence" component={Residence}></Route>

          <Route exact path="/Login" component={Login}></Route>

          <Route exact path="/Login" exact component={Login}></Route>
          <Route exact path="/Profile" exact component={profile}></Route>
          <Route exact path='/home' component={HomePage}></Route>
          <Route exact path='/contact' component={Contact}></Route>
          <Route exact path="/viewFeedback" component={ViewFeedback}></Route>
          <Route exact path="/libraryProfile" component={profile}></Route>
          <Route exact path="/searchBar" component={SearchBar}></Route>
          <Route exact path="/details" component={Details}></Route>
        </Switch>
      </div>
      <div>
          <LexChat
            botName="Navigation"
            IdentityPoolId="us-east-1:490d8d9b-4877-4f91-a06d-aee20121e312"
            placeholder="Placeholder text"
            style={{ position: 'absolute' }}
            backgroundColor="#FFFFFF"
            height="430px"
            region="us-east-1"
            headerText="Chat with our awesome bot" />
        </div>

    </BrowserRouter>
  );
}

export default App;