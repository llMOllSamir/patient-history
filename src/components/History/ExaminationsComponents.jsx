import styles from "./PatientHistory.module.css";

export const PersonalInformation = ({ data }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo col={2} description={data ? data.name : ""} title={"name"} />

      <ArticalInfo
        description={data ? data.national_id : ""}
        title={"National ID"}
      />

      <ArticalInfo description={data ? data.patient_code : ""} title={"code"} />

      <ArticalInfo
        description={data ? data.date_of_birth : ""}
        title={"Date of birth"}
      />

      <ArticalInfo description={data ? data.age : ""} title={"age"} />

      <ArticalInfo
        description={data ? data.marital_state : ""}
        title={"Marital status"}
      />

      <ArticalInfo description={data ? data.address : ""} title={"Address"} />

      <h2 className="text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2">
        Contact Information
      </h2>

      <ArticalInfo
        description={data ? data.phone_number : ""}
        phone={true}
        title={"Phone number"}
      />

      <ArticalInfo
        description={data ? data.email || "Not Found" : ""}
        title={"E-mail"}
      />

      <ArticalInfo
        description={data ? data.relative_phone : ""}
        phone={true}
        title={"Home number"}
      />
      <ArticalInfo
        description={data ? data.relative_name : ""}
        title={"Relative name"}
      />
    </div>
  );
};

export const GeneralExamination = ({ generalExamination }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={generalExamination ? generalExamination.height : ""}
        title={"height(cm)"}
      />

      <ArticalInfo
        description={generalExamination ? generalExamination.pulse : ""}
        title={"pulse"}
      />

      <ArticalInfo
        description={generalExamination ? generalExamination.weight : ""}
        title={"wight"}
      />

      <ArticalInfo
        description={
          generalExamination ? generalExamination.random_blood_sugar : ""
        }
        title={"random blood sugar"}
      />

      <ArticalInfo
        description={
          generalExamination ? generalExamination.blood_pressure : ""
        }
        title={"blood pressure"}
      />
    </div>
  );
};

export const Gynecological = ({ gynaecological }) => {
  return (
    <section className="lg:ms-20 ms-4 grid grid-cols-1 md:grid-cols-2 gap-8 select-none">
      <article className="flex flex-col gap-2 col-span-2">
        <h2 className="font-medium text-2xl">Date of last period</h2>
        <p className="text-xl font-semibold text-gray-500">
          {gynaecological?.date_of_last_period || ""}
        </p>
      </article>

      <article className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">Menstrual cycle abnormalities</h2>
        <p className="text-xl font-semibold text-gray-500">
          {gynaecological?.menstrual_cycle_abnormalities || ""}
        </p>
      </article>

      <article className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">Contact bleeding</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="ContactYes">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.contact_bleeding === 1}
              name="Contact"
              value={"yes"}
              readOnly
              id="ContactYes"
            />{" "}
            Yes
          </label>
          <label htmlFor="ContactcNo">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.contact_bleeding === 0}
              name="Contact"
              value={"no"}
              readOnly
              id="ContactcNo"
            />{" "}
            No
          </label>
        </div>
      </article>

      <article
        className={`flex flex-col gap-2 ${
          gynaecological?.menopause === 0 && "col-span-2"
        }`}
      >
        <h2 className="font-medium text-2xl">Menopause</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="MenopauseYes">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.menopause === 1}
              name="Menopause"
              value={"yes"}
              readOnly
              id="MenopauseYes"
            />{" "}
            Yes
          </label>
          <label htmlFor="MenopauseNo">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.menopause === 0}
              name="Menopause"
              value={"no"}
              readOnly
              id="MenopauseNo"
            />{" "}
            No
          </label>
        </div>
      </article>

      {gynaecological?.menopause === 1 && (
        <article className="flex flex-col gap-2">
          <h2 className="font-medium text-2xl">If yes , mention Age</h2>
          <p className="text-xl font-semibold text-gray-500">
            {gynaecological?.menopause_age}
          </p>
        </article>
      )}

      <article
        className={`flex flex-col gap-2 ${
          gynaecological?.using_of_contraception === 0 && "col-span-2"
        }`}
      >
        <h2 className="font-medium text-2xl">Using of contraception</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="contraceptionYes">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.using_of_contraception === 1}
              name="contraception"
              value={"yes"}
              readOnly
              id="contraceptionYes"
            />{" "}
            Yes
          </label>
          <label htmlFor="contraceptionNo">
            <input
              type="radio"
              className="checkedInput"
              checked={gynaecological?.using_of_contraception === 0}
              name="contraception"
              value={"no"}
              readOnly
              id="contraceptionNo"
            />{" "}
            No
          </label>
        </div>
      </article>

      {gynaecological?.using_of_contraception === 1 && (
        <article className="flex flex-col gap-2">
          <h2 className="font-medium text-2xl">If yes , mention the method</h2>
          <p className="text-xl font-semibold text-gray-500">
            {gynaecological?.contraception_method ||
              gynaecological?.other_contraception_method ||
              ""}
          </p>
        </article>
      )}
    </section>
  );
};

export const Cervix = ({ cervix }) => {
  return <></>;
};

export const Uterine = ({ uterine }) => {
  return (
    <>
      <div className="select-none capitalize  px-2 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className=" flex flex-col gap-5 ">
            <div>
              <p>Lynch Syndrome</p>
              <div className="   rounded-lg p-2 xl:w-1/2 mt-2 ">
                <label htmlFor="LynchSyndromePiv" className="flex gap-4">
                  <input
                    name="LynchSyndrome"
                    className={`${styles.shadow}`}
                    id="LynchSyndromePiv"
                    type="radio"

                    checked={uterine?.lynch_syndrome === "+ve"}

                    readOnly
                  />
                  +ve
                </label>
                <label htmlFor="LynchSyndromeNiv" className="flex gap-4">
                  <input
                    name="LynchSyndrome"
                    className={`${styles.shadow}`}
                    id="LynchSyndromeNiv"
                    type="radio"

                    checked={uterine?.lynch_syndrome === "-ve"}

                    readOnly
                  />{" "}
                  -ve
                </label>
              </div>
            </div>

            <div>
              <p>Irregular bleeding</p>
              <div className="  rounded-lg p-2 xl:w-1/2 mt-2 ">
                <label htmlFor="IrregularBleedingYes" className="flex gap-4">
                  <input
                    name="IrregularBleeding"
                    className={`${styles.shadow}`}
                    id="IrregularBleedingYes"

                    checked={uterine?.irregular_bleeding === 1}

                    readOnly
                    type="radio"
                    value={true}
                  />{" "}
                  yes
                </label>
                <label htmlFor="IrregularBleedingNo" className="flex gap-4">
                  <input
                    name="IrregularBleeding"
                    className={`${styles.shadow}`}
                    id="IrregularBleedingNo"

                    checked={uterine?.irregular_bleeding === 0}

                    readOnly
                    type="radio"
                    value={false}
                  />{" "}
                  no
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 md:col-span-2 flex-col flex gap-8">
            <div className="w-full  overflow-auto flex flex-col gap-5">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                      Result
                    </th>
                    <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      rowSpan="4"
                      className="bg-gray-300 px-2 border-2 border-blue-700 border-opacity-35"
                    >
                      TVS
                    </th>
                  </tr>
                  <tr>
                    <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                      Perimetrium
                    </th>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_perimetrium_result"
                        className="outline-none bg-transparent  px-3 w-full"
                        type="text"

                        value={uterine?.tvs_perimetrium_result || ""}

                        readOnly
                      />
                    </td>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_perimetrium_comment"
                        className="outline-none bg-transparent  px-3 w-full"
                        type="text"

                        value={uterine?.tvs_perimetrium_comment || ""}

                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                      Mayometrium
                    </th>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_myometrium_result"
                        className="outline-none bg-transparent  px-3 w-full"
                        type="text"

                        value={uterine?.tvs_myometrium_result || ""}

                        readOnly
                      />
                    </td>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_myometrium_comment"
                        className="outline-none  bg-transparent px-3 w-full"
                        type="text"

                        value={uterine?.tvs_myometrium_comment || ""}

                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                      Endometrium
                    </th>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_endometrium_result"
                        className="outline-none bg-transparent  px-3 w-full"
                        type="text"

                        value={uterine?.tvs_endometrium_result || ""}

                        readOnly
                      />
                    </td>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="tvs_endometrium_comment"
                        className="outline-none  bg-transparent px-3 w-full"
                        type="text"
                        value={uterine?.tvs_endometrium_comment || ""}

                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                      Result
                    </th>
                    <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                      Biopsy
                    </th>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="biopsy_result"
                        className="outline-none bg-transparent  px-3 w-full"
                        type="text"
                        value={uterine?.biopsy_result || ""}

                        readOnly
                      />
                    </td>
                    <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                      <input
                        name="biopsy_comment"
                        className="outline-none bg-transparent px-3 w-full"
                        type="text"

                        value={uterine?.biopsy_comment || ""}

                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Obstetrics = ({ obstetrics }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={obstetrics ? obstetrics.gravidity : ""}
        title={"gravidity"}
      />

      <ArticalInfo
        description={obstetrics ? obstetrics.parity : ""}
        title={"parity"}
      />

      <ArticalInfo
        description={obstetrics ? obstetrics.abortion : ""}
        title={"abortion"}
      />

      <ArticalInfo
        col={2}
        description={obstetrics ? obstetrics.notes : ""}
        title={"notes"}
      />
    </div>
  );
};

export const Breast = ({ breast }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo description={breast ? breast.age : ""} title={"age"} />

      <ArticalInfo
        description={breast ? breast.family_history : ""}
        title={"family history"}
      />

      <ArticalInfo
        col={2}
        description={breast ? breast.recommendations : ""}
        title={"recommendations"}
      />
    </div>
  );
};
export const Ovarian = ({ ovarian }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={
          ovarian ? (ovarian.breast_cancer_history ? "yes" : "no") : ""
        }
        title={"Do you have a personal history of breast cancer?"}
        col={2}
      />

      <ArticalInfo
        description={
          ovarian ? (ovarian.relatives_with_ovarian_cancer ? "yes" : "no") : ""
        }
        title={"Do you have one or more relatives with ovarian cancer?"}
        col={2}
      />

      <ArticalInfo
        description={
          ovarian
            ? ovarian.gene_mutation_or_lynch_syndrome
              ? "yes"
              : "no"
            : ""
        }
        title={
          "Do you have the BRCA1 or BRCA2 gene mutation or Lynch syndrome - hereditary nonpolyposis colorectal cancer (HNPCC)?"
        }
        col={2}
      />

      <ArticalInfo
        description={ovarian ? ovarian.recommendations : ""}
        title={"recommendations"}
        col={2}
      />

      <table className="w-full text-md bg-white shadow-md mb-4 col-span-2 md:col-span-1">
        <tbody>
          <tr className="border-b">
            <th></th>
            <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t">
              Result
            </th>
            <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-r border-t">
              Comments
            </th>
          </tr>
          <tr className=" bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
            <th className="p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t border-r text-xl">
              TVS
            </th>
            <td className="p-3 px-5 border-blue-900 border-solid border-r">
              {ovarian ? ovarian.tvs_result || "" : ""}
            </td>
            <td className="p-3 px-5">
              {ovarian ? ovarian.tvs_comment || "" : ""}
            </td>
          </tr>
          <tr className="bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
            <th className="p-3 px-5 border-b border-l border-r border-blue-900 border-solid bg-neutral-200  text-xl">
              CA-125
            </th>
            <td className="p-3 px-5 border-blue-900 border-solid border-r">
              {ovarian ? ovarian["ca-125_result"] || "" : ""}
            </td>
            <td className="p-3 px-5">
              {ovarian ? ovarian["ca-125_comment"] || "" : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Osteoporosis = ({ osteoporosis }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={osteoporosis ? osteoporosis.age : ""}
        title={"age"}
      />

      <ArticalInfo
        description={osteoporosis ? osteoporosis.weight : ""}
        title={"weight"}
      />

      <ArticalInfo
        description={
          osteoporosis
            ? osteoporosis.current_oestrogen_use
              ? "yes"
              : "no"
            : ""
        }
        title={"current oestrogen use"}
      />

      <ArticalInfo
        col={2}
        description={osteoporosis ? osteoporosis.recommendations : ""}
        title={"recommendations"}
      />
    </div>
  );
};

export const PreEclampsia = ({ preEclampsia }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={
          preEclampsia
            ? preEclampsia["history_of_pre-eclampsia"]
              ? "yes"
              : "no"
            : ""
        }
        title={"history of pre-eclampsia"}
      />

      <ArticalInfo
        description={
          preEclampsia ? preEclampsia.number_of_pregnancies_with_pe : ""
        }
        title={"number of pregnancies with pe"}
      />

      {preEclampsia &&
      preEclampsia.date_of_pregnancies_with_pe &&
      preEclampsia.date_of_pregnancies_with_pe.length
        ? preEclampsia.date_of_pregnancies_with_pe.map((date, index) => {
            if (date) {
              return (
                <ArticalInfo
                  key={index}
                  description={date}
                  title={`date of pregnancies with pe #${index + 1}`}
                />
              );
            }
          })
        : null}

      <ArticalInfo
        description={preEclampsia ? preEclampsia.fate_of_the_pregnancy : ""}
        title={"fate of the pregnancy"}
      />
    </div>
  );
};

const ArticalInfo = ({ title, description, col, phone = null }) => {
  return (
    <article
      className={`flex flex-col font-medium capitalize ${
        col && `md:col-span-${col}`
      }`}
    >
      <h3 className=" text-black   text-xl">{title || ""}</h3>
      {phone ? (
        <a
          className=" text-gray-600 text-base w-fit"
          href={`tel:${description}`}
        >
          {description || ""}
        </a>
      ) : (
        <p className=" text-gray-600 text-base">{description || ""}</p>
      )}
    </article>
  );
};
