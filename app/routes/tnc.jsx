import { Form, Link } from "@remix-run/react";
import Button from "~/components/Button";


export default function Index() {

  return (
    <div className="flex flex-col items-stretch h-screen justify-start gap-6">
      <p className="font-bold text-3xl text-center">Terms & condition</p>
      <Form>
        <input type="text"/>
      </Form>
      <Button as={Link} to="/login">Next</Button>
    </div>
  );
}
