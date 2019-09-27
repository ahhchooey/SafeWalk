import $ from "jquery";


export const fetchRoute = (query) => {
  return $.ajax({
    url: `api/intersections/all`,
    method: "GET",
    data: {
      query: query
    }
  })
}
