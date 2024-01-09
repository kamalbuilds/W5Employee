import { Link } from "@chakra-ui/react";
import { format } from "date-fns";
import { DUMMY_DATA, DUMMY_START_DATE } from "../../../constants/general";
import PhotoPreview from "../Sections/Photo/PhotoPreview";
import VCProjectcard from "../../VCProjectcard";

function ModernTemplate({
  userDetails,
  projects,
  skills,
  socials,
  educations,
  selectedImage,
  arrayofVc,
}) {
  return (
    <>
      <header className="flex bg-custom-primary bg-opacity-70 p-10 gap-20">
        <div className="w-4/6 text-custom-a11y flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <PhotoPreview selectedImage={selectedImage} />
            <div>
              <p className="text-3xl font-bold">
                {userDetails.firstName} {userDetails.lastName}
              </p>
              <p className="text-xl font-bold mb-4">{userDetails.jobTitle}</p>
            </div>
          </div>
          <p>{userDetails.bio}</p>
        </div>
        <div className="text-custom-a11y">
          <p>{userDetails.email}</p>
          {socials.map((social, index) => (
            <Link
              to={social.socialLink || DUMMY_DATA.socialLink}
              target="_blank"
              rel="noreferrer noopener"
              key={index}
              className="block"
            >
              {social.socialName || DUMMY_DATA.socialName}
            </Link>
          ))}
        </div>
      </header>
      <div className="p-10 flex gap-10">
        <section className="w-3/5">
          <p className="text-xl font-bold text-custom-primary mb-4">
            VC Work Experiences
          </p>
          <div>
              {arrayofVc && arrayofVc?.map((vc, index) => (
                <VCProjectcard
                  vcData={vc}
                />
              ))}
            </div>
        </section>
        <section className="flex gap-10 w-2/5">
          <div className="flex-1">
            <p className="text-xl font-bold text-custom-primary mb-4">
              Education
            </p>
            {educations?.map((education, index) => (
              <div key={index} className="group relative">
                <header className="flex flex-col mb-2">
                  <p className="font-semibold">
                    {education.educationTitle || DUMMY_DATA.educationTitle}
                  </p>{" "}
                  <div className="opacity-40">
                    <span>
                      {education.stDate
                        ? format(education.stDate, "MMM do, yyyy")
                        : format(DUMMY_START_DATE, "MMM do, yyyy")}
                    </span>{" "}
                    -{" "}
                    <span>
                      {education.enDate
                        ? format(education.enDate, "MMM do, yyyy")
                        : "Present"}
                    </span>
                  </div>
                </header>
              </div>
            ))}
            <div className="mt-10">
              <p className="text-xl font-bold text-custom-primary mb-4">
                Skills
              </p>
              {skills.map((skill, index) => (
                <p key={index}>{skill || DUMMY_DATA.skill[index]}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ModernTemplate;
