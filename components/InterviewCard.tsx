import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { cn, getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import React from "react";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor = {
    Behavioral: "bg-light-400",
    Mixed: "bg-light-600",
    Technical: "bg-light-800",
  }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format(
    "MMM D, YYYY"
  );

  return (
    <div className="card-border w-full sm:w-[360px] min-h-96">
      <div className="card-interview relative flex flex-col p-4 gap-4">
        {/* Badge */}
        <div
          className={cn(
            "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
            badgeColor
          )}
        >
          <p className="badge-text">{normalizedType}</p>
        </div>

        {/* Cover Image */}
        <div className="flex justify-center">
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />
        </div>

        {/* Role */}
        <h3 className="text-center text-lg font-semibold capitalize">{role} Interview</h3>

        {/* Date & Score */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-2">
          <div className="flex items-center gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>{formattedDate}</p>
          </div>

          <div className="flex items-center gap-2">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        {/* Feedback or Placeholder Text */}
        <p className="line-clamp-2 mt-2 text-center text-sm">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          {/* Replace with actual component */}
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary px-4 py-2">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
              className="text-black-100"
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
