import Accordion from '../../ui/accordion'

const ListQuestions = [
  {
    title: "How do I create an account?",
    content: "Click the 'Get Started' button in the landing page and follow the registration process."
  },
  {
    title: "How do I reset my password?",
    content: "Go to the login page, click 'Forgot Password', and follow the instructions."
  },
  {
    title: "How do I support developer?",
    content: "Vote our Buidl on Dorahacks. Thanks mate!"
  }];

export default function FQA() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between pt-24">
      <div className="flex w-3/4 px-16 gap-16 flex-col items-center">
        <h3 style={{ fontFamily: 'Namco Regular' }} className="text-2xl text-[#505050]">frequently asked question</h3>

        <div className="w-full space-y-8">
          {ListQuestions.map((item, index) => (
            <Accordion key={index} title={item.title}>
              {item.content}
            </Accordion>
          ))}
        </div>
      </div>

      <div className="w-full h-42 px-16 text-lg flex justify-center items-center text-center px-4 bg-gradient-to-b from-[#BA2685] to-[#F36BAB] text-white mt-16">
      </div>
    </div>
  )
};
