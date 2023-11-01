import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("<Footer />", () => {
  it("Displays the correct links", () => {
    render(<Footer />);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nliles/"
    );
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "https://github.com/nliles"
    );
    expect(screen.getAllByRole("link")[2]).toHaveAttribute(
      "href",
      "https://www.instagram.com/natalieliles/"
    );
  });
});
