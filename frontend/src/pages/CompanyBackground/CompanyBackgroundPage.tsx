import { Card, Flex} from "antd";
import AboutUs from "../../assets/aboutus.jpeg";
import Histroy from "../../assets/history.jpeg"
import Values from "../../assets/values.jpg"


const cardStyle: React.CSSProperties = {
  width: "900px",
  margin: "auto",
  marginTop: "20px",
};

const bigcardStyle: React.CSSProperties = {
  width: "1000px",
  margin: "auto",
  border: "2px solid #e6eeff",
  marginTop: "30px",
  backgroundColor: "#e6eeff",
};

const CompanyBackgroundPage: React.FC = () => {
  return (
    <Card style={bigcardStyle}>
      <h1 style={{ marginTop: "0px" }}>Company's Background</h1>
      <Card
        style={cardStyle}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
      >
        <div>
          <Flex justify="space-between">
            <Flex
              vertical
              align="flex-start"
              justify="space-between"
              style={{ padding: 32 }}
            >
              <h2 style={{ marginTop: "0px" }}>About Us</h2>
              <p>
                CodeVider is a leading provider of cutting-edge technology
                solutions, dedicated to empowering businesses of all sizes. With
                a focus on innovation and customer success, we strive to
                transform the way organizations operate and thrive in the
                digital landscape.
              </p>
            </Flex>
            <img style={{ width: "300px", height: "auto" }} src={AboutUs}></img>
          </Flex>
        </div>
      </Card>
      <Card
        style={cardStyle}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
      >
        <div>
          <Flex justify="space-between">
            <img style={{ width: "300px", height: "auto" }} src={Histroy}></img>
            <Flex
              vertical
              align="flex-start"
              // justify="space-between"
              style={{ padding: 32 }}
            >
              <h2 style={{ marginTop: "0px" }}>Our History</h2>
              <p>
                CodeVider was founded in 2010 with a vision to revolutionize the
                way businesses leverage technology. Over the years, we've grown
                into a trusted partner for organizations across industries,
                helping them navigate the ever-evolving digital landscape and
                achieve their goals.
              </p>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card
        style={cardStyle}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
      >
        <div>
          <Flex justify="space-between">
            <Flex
              vertical
              align="flex-start"
              justify="space-between"
              style={{ padding: 32 }}
            >
              <h2 style={{ marginTop: "0px" }}>Our Values</h2>
              <p>
                At the heart of CodeVider are our core values: innovation,
                integrity, and customer-centricity. We are committed to pushing
                the boundaries of what\'s possible, always striving to deliver
                solutions that exceed our clients' expectations. Our unwavering
                dedication to ethical practices and transparent communication
                has earned us the trust of businesses worldwide.
              </p>
            </Flex>
            <img style={{ width: "300px", height: "auto" }} src={Values}></img>
          </Flex>
        </div>
      </Card>
    </Card>
  );
};

export default CompanyBackgroundPage;
