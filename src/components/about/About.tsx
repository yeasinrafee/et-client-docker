import Image from "next/image";
import Container from "@/components/shared/layout/Container";
import ap1 from "@/assets/images/approach/ap1.png";
import ap3 from "@/assets/images/approach/ap3.png";

const About = () => {
  return (
    <div className="bg-white">
      {/* Section 1: Image Left, Content Right */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 border-b border-accent">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-primary rounded-[32px] overflow-hidden flex items-center justify-center p-8 group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src={ap1}
                alt="Our Mission and Vision"
                className="object-contain w-3/4 h-3/4 transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
              />
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-primary/5 px-4 py-2 rounded-full inline-block">
                  Mission & Vision
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                  Driving Innovation Through Custom Software
                </h2>
                <div className="w-20 h-1.5 bg-primary rounded-full"></div>
              </div>

              <div className="space-y-6 text-secondary/70 text-lg leading-relaxed">
                <p>
                  At <strong>Emperal Tech</strong>, our mission is to empower
                  businesses by providing cutting-edge, custom software
                  solutions that streamline operations, drive growth, and
                  enhance user experiences. We believe that technology should
                  adapt to your business, not the other way around.
                </p>
                <p>
                  Our vision is to become the globally recognized leader in
                  tailored digital transformations. We aim to consistently push
                  the boundaries of web and software development, ensuring our
                  clients stay ahead in an ever-evolving digital landscape.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: Content Left, Image Right */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-primary/5 px-4 py-2 rounded-full inline-block">
                  Goals & Reliability
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                  A Partner You Can Rely On
                </h2>
                <div className="w-20 h-1.5 bg-primary rounded-full"></div>
              </div>

              <div className="space-y-6 text-secondary/70 text-lg leading-relaxed">
                <p>
                  Our primary goal is to deliver software that doesn't just meet
                  expectations, but exceeds them. We strive for excellence in
                  every line of code we write, focusing on scalability,
                  security, and performance. We measure our success by the
                  success of the businesses we partner with.
                </p>
                <p>
                  <strong>Reliability is our cornerstone.</strong> When you
                  choose Emperal Tech, you are choosing a dedicated team that is
                  committed to transparency, on-time delivery, and robust
                  post-launch support. Our solutions are built on resilient
                  architectures, ensuring maximum uptime and peace of mind for
                  your critical operations.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-secondary rounded-[32px] overflow-hidden flex items-center justify-center p-8 group order-1 md:order-2">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src={ap3}
                alt="Our Goals and Reliability"
                className="object-contain w-3/4 h-3/4 transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
