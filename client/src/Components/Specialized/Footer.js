import { Flex, Link } from "@chakra-ui/react";
import React from "react";
function Footer() {
  return (
    <Flex justify="center">
      Made with&nbsp;
      <span aria-label="heart" role="img">
        &#128156;
      </span>
      &nbsp; by&nbsp;
      <Link href="https://github.com/imphungky" isExternal>
        Michael Phung
      </Link>
      &nbsp;&&nbsp;
      <Link href="https://github.com/jcserv" isExternal>
        Jarrod Servilla
      </Link>
    </Flex>
  );
}
export default Footer;
