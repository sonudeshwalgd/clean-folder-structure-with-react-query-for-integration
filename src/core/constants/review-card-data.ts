type ReviewType = {
  id: string;
  title: string;
  location: string;
  status: boolean;
  deadline?: string;
  time: string;
  verified?: boolean;
};

export const reviewCardData: Array<ReviewType> = [
  {
    id: "0",
    title: "ASK Film Festival",
    location: "Maharastra , India",
    time: "Closed",
    status: true,
    deadline: "Upcomimg Deadline : 12 January 2023",
    verified: true,
  },
  {
    id: "1",
    title: "ASK Film Festival",
    location: "Delhi , India",
    time: "Closed",
    status: false,
  },
];

export const categoryData: Array<string> = [
  "Animation",
  "Documantory",
  "Experimental",
  "Feature",
  "Music Video",
  "Short",
  "Student",
  "Web / New Media",
];
