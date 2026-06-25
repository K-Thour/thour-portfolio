import { describe, expect, it } from "vitest";
import { normalizeProjectList } from "./useProjectDetail";

describe("normalizeProjectList", () => {
  it("unwraps an API envelope with data array", () => {
    const payload = {
      data: [
        {
          _id: "project-1",
          title: "Chatty",
        },
      ],
      total: 1,
    };

    expect(normalizeProjectList(payload)).toEqual([
      {
        _id: "project-1",
        title: "Chatty",
      },
    ]);
  });

  it("returns a direct array as-is", () => {
    const payload = [
      {
        _id: "project-2",
        title: "Portfolio",
      },
    ];

    expect(normalizeProjectList(payload)).toEqual(payload);
  });
});
