import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { signIn, signUp } from "@/api/auth";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "@/lib/validations";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "@/store/GlobalStore";
import useOnlyAllowUnAuth from "@/hooks/useOnlyAllowUnAuth";

const SignUpForm = ({ title, description, onSumbit = () => {} }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: ({ token }) => {
      if (token) {
        useGlobalStore.getState().login({ token });
        navigate("/");
      }
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validationSchema={signUpValidationSchema}
    >
      {({
        values,
        isValid,
        errors,
        touched,
        handleChange,
        handleBlur,
        ...others
      }) => {
        const isButtonDisabled =
          !isValid || !Object.keys(touched).length || mutation.isPending;
        return (
          <Card>
            <CardHeader>
              <CardTitle className="">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <div className="text-sm text-red-800">
                  {errors.username && touched.username && errors.username}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="text-sm text-red-800">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="text-sm text-red-800">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isButtonDisabled}
                onClick={() => {
                  mutation.mutate(values);
                }}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        );
      }}
    </Formik>
  );
};

const LoginForm = ({ title, description, onSumbit = () => {} }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: ({ token }) => {
      if (token) {
        useGlobalStore.getState().login({ token });
        navigate("/");
      }
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
    >
      {({
        values,
        isValid,
        errors,
        touched,
        handleChange,
        handleBlur,
        ...others
      }) => {
        const isButtonDisabled =
          !isValid || !Object.keys(touched).length || mutation.isPending;
        return (
          <Card>
            <CardHeader>
              <CardTitle className="">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="text-sm text-red-800">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="text-sm text-red-800">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isButtonDisabled}
                onClick={() => {
                  mutation.mutate(values);
                }}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        );
      }}
    </Formik>
  );
};

function Login() {
  useOnlyAllowUnAuth();
  const [mode, setMode] = useState("login");
  return (
    <div className="min-h-screen">
      <div className="w-full min-h-screen h-1 lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <Tabs
              defaultValue="login"
              className="w-full sm:w-[400px]"
              onValueChange={(value) => {
                setMode(value);
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm
                  title={"Login"}
                  description={"Please enter your email and password to login"}
                />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm
                  title={"Sign up"}
                  description={
                    "Please enter username, email and password to create account"
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden bg-muted lg:block h-full relative">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1721858125140-57077cfc8b1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1721858125140-57077cfc8b1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
