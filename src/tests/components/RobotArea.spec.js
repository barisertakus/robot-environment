import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import RobotArea from "../../components/RobotArea";
import { server } from "../mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("initialize RobotArea", () => {
  beforeEach(async () => {
    render(<RobotArea />);
  });
  describe("before the page loads", () => {
    it("render the Loading", () => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  describe("after page loaded", () => {
    beforeEach(async () => {
      await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    });

    it("render robot image", () => {
      expect(screen.getByRole("img", { name: "robot" }));
    });
  });
});
