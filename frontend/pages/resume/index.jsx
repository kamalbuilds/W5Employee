import { useRef, useState } from "react";
import { Button } from "../../components/resumecomponents/ui/button";
import { Separator } from "../../components/resumecomponents/ui/separator";
import { DownloadIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import Projects from "../../components/resumecomponents/Sections/Projects";
import Socials from "../../components/resumecomponents/Sections/Socials";
import Skills from "../../components/resumecomponents/Sections/Skills";
import UserDetails from "../../components/resumecomponents/Sections/UserDetails";
import {
  INITIAL,
  INITIAL_SCALE,
  INITIAL_TEMPLATE,
  MAP_SCALE_VALUES_TO_TAILWIND_STYLE,
  MAP_STATE_TO_TYPE,
} from "../../constants/general";
import { useReactToPrint } from "react-to-print";
import { Accordion } from "../../components/resumecomponents/ui/accordion";
import TemplateRenderer from "../../components/resumecomponents/TemplateRender/TemplateRender";
import Education from "../../components/resumecomponents/Sections/Education";
import useZoom from "../../hooks/useZoom";
import Customization from "../../components/resumecomponents/Sections/Customization";

export const meta = () => {
  return [
    { title: "VC Resume Builder" },
    { name: "description", content: "Creating your resume with VCs" },
  ];
};

export default function Resume() {
  const [userDetails, setUserDetails] = useState(
    MAP_STATE_TO_TYPE[INITIAL].userDetails
  );
  const [projects, setProjects] = useState(MAP_STATE_TO_TYPE[INITIAL].projects);
  const [socials, setSocials] = useState(MAP_STATE_TO_TYPE[INITIAL].socials);
  const [skills, setSkills] = useState(MAP_STATE_TO_TYPE[INITIAL].skills);
  const [educations, setEducations] = useState(
    MAP_STATE_TO_TYPE[INITIAL].educations
  );
  const [selectedTemplate, setSelectedTemplate] = useState(INITIAL_TEMPLATE);
  const [selectedImage, setSelectedImage] = useState(null);
  const { zoom, handleZoomIn, handleZoomOut } = useZoom(INITIAL_SCALE);
  const [border, setBorder] = useState(2);
  const templateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: `${userDetails.firstName} ${userDetails.lastName} - CV`,
  });

  return (
    <div className="flex gap-20 p-5 relative flex-col lg:flex-row">
      <div className="lg:w-2/5 flex flex-col gap-10 print:hidden">
        <Accordion type="multiple" className="w-full">
          <UserDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setSelectedImage={setSelectedImage}
          />
          <Separator />
          <Projects projects={projects} setProjects={setProjects} />
          <Separator />
          <Socials socials={socials} setSocials={setSocials} />
          <Separator />
          <Skills skills={skills} setSkills={setSkills} />
          <Separator />
          <Education educations={educations} setEducations={setEducations} />
          <Separator />
        </Accordion>
        <Customization
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          border={border}
          setBorder={setBorder}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              handlePrint();
            }}
          >
            Download CV
            <DownloadIcon className="ms-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleZoomIn}>
            <ZoomInIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleZoomOut}>
            <ZoomOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <section className="print:left-0 print:w-full">
        <div
          className={`border-black border-2 print:border-none h-[267mm] lg:fixed lg:-top-24 w-full transform transition-transform duration-300 ${MAP_SCALE_VALUES_TO_TAILWIND_STYLE[zoom]}`}
          id="container"
        >
          <TemplateRenderer
            selectedTemplate={selectedTemplate}
            userDetails={userDetails}
            projects={projects}
            skills={skills}
            socials={socials}
            educations={educations}
            selectedImage={selectedImage}
            templateRef={templateRef}
            border={border}
          />
        </div>
      </section>
    </div>
  );
}
