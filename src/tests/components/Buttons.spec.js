import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Buttons from "../../components/Buttons";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import HelpDialog from "../../components/HelpDialog";

describe("Buttons", () => {
  describe("initialized without props", () => {
    beforeEach(() => {
      render(<Buttons />);
    });

    it("renders script input", () => {
      expect(screen.getByLabelText(/Script/)).toBeInTheDocument();
    });

    it("renders send button", () => {
      expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    });

    it("renders help button", () => {
      expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    });
  });

  describe("click help button", () => {
    beforeEach(async () => {
      render(<HelpDialog />);
      await user.click(screen.getByRole("button", { name: /help/i }));
    });
    it("renders help dialog", async () => {
      expect(screen.getByText("How to use script")).toBeInTheDocument();
      expect(
        screen.getByRole("dialog", { name: /How to use script/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /help/i })
      ).not.toBeInTheDocument();
    });

    describe("press esc after dialog opens", () => {
      beforeEach(async () => {
        await user.click(screen.getByRole("button", { name: /okay/i }));
      });
      it("close help dialog", async () => {
        await waitForElementToBeRemoved(() =>
          screen.getByRole("dialog", { name: /How to use script/i })
        );
      });
    });
  });
});
