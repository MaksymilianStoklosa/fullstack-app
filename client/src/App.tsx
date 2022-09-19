import React, { useState } from "react";
import { CreateUserForm } from "templates/create-user-form";
import { CreateUserSchema } from "types/user-form.types";
import "./styles/main.scss";

function App() {
  const [user, setUser] = useState<CreateUserSchema>();

  return (
    <div className="App">
      <main>
        <section>
          <h3>Let's create your own user!</h3>
          <CreateUserForm setUser={setUser} />

          {user ? (
            <div>
              <h5>
                User created: {user.firstName} {user.lastName}
              </h5>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
