// 'use client';

// import { Container, Image, Row, Button } from 'react-bootstrap';
// import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
// /** The Home page. */
// const Home = () => (
//   <main>
//     <Container id="landing-page" fluid className="py-3">
//       <Row className="align-middle text-center">
//         <div className="box">
//           <div className="header">
//             <h1>Dear Sunshine</h1>
//             <Image src="/sunstamp2.png" alt="Sunshine Stamp" className="sun-image" />
//           </div>
//           <p>A platform designed to uplift and encourage individuals who may be going through tough times.</p>
//           <div className="button-group">
//             <Button variant="primary" href="/auth/signin" className="me-2">
//               <PersonFill />
//               Sign In
//             </Button>
//             <Button variant="secondary" href="/auth/signup">
//               <PersonPlusFill />
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </Row>
//     </Container>
//   </main>
// );

// export default Home;

'use client';

import { Container, Image, Row, Button } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <div className="box">
          <div className="header">
            <h1>Dear Sunshine</h1>
            <Image src="/sunstamp2.png" alt="Sunshine Stamp" className="sun-image" />
          </div>
          <p>A platform designed to uplift and encourage individuals who may be going through tough times.</p>
          <div className="button-group">
            <Button variant="primary" href="/auth/signin" className="me-2">
              <PersonFill />
              Sign In
            </Button>
            <Button variant="secondary" href="/auth/signup">
              <PersonPlusFill />
              Sign Up
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  </main>
);

export default Home;
