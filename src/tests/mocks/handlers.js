import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8080/api/robot", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        direction: "LEFT",
        turnAround: false,
        createdDate: "2022-05-02T22:30:18.074+00:00",
        updatedDate: "2022-05-04T17:08:10.999+00:00",
        xcoordinate: 2,
        ycoordinate: 2,
      })
    );
  }),
  rest.post("http://localhost:8080/api/robot", (req, res, ctx) => {
    const { scriptText } = req.body;
    if(!scriptText)
      return res(ctx.status(500), ctx.json({message: "Error!"}))
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        direction: "RIGHT",
        turnAround: false,
        createdDate: "2022-05-02T22:30:18.074+00:00",
        updatedDate: "2022-05-04T17:08:10.999+00:00",
        xcoordinate: 4,
        ycoordinate: 4,
      })
    );
  }),
];

// {
//   "id": 1,
//   "direction": "LEFT",
//   "turnAround": false,
//   "createdDate": "2022-05-02T22:30:18.074+00:00",
//   "updatedDate": "2022-05-04T17:08:10.999+00:00",
//   "xcoordinate": 4,
//   "ycoordinate": 1
// }
